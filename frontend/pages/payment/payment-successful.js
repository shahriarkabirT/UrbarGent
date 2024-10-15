import { useEffect,useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { usePaymentVerificationMutation } from "@/store/slices/api/paymentSlice";
import { useUpdatePaymentStatusMutation,useLazyFetchOrderByIdQuery } from "@/store/slices/api/orderApiSlice";
import { toastManager } from "@/utils/toastManager";
import { useLazyFetchProductByIdQuery,useUpdateProductQuantityMutation } from "@/store/slices/api/productApiSlice";

const PaymentSuccessful = () => {
  const [productId , setProductId] = useState(null);
  const [paymentSuccess] = usePaymentVerificationMutation();
  const [updatePaymentStatus] = useUpdatePaymentStatusMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderID = searchParams.get("order_id");

  const [triggerFetchOrder, { data: order }] = useLazyFetchOrderByIdQuery();
  const [triggerFetchProduct, { data: product }] = useLazyFetchProductByIdQuery();
  const [updateProductQuantity] = useUpdateProductQuantityMutation();
  useEffect(() => {
    const fetchOrderAndProduct = async () => {
      const response = await paymentSuccess(orderID).unwrap();
      if (response.status_code === "2") {
      if (orderID) {
        // Fetch order first
        const fetchedOrder = await triggerFetchOrder(orderID).unwrap();
        
        if (fetchedOrder?.order?.orderItems?.length > 0) {
          const order_quantity = fetchedOrder.order.orderItems[0].quantity;
          const productID = fetchedOrder.order.orderItems[0].product._id;
          setProductId(productID);
          console.log("product id: " + productID);
          // Fetch the product after the order is fetched
          const products = await triggerFetchProduct(productID).unwrap();
          const product_quantity = products.quantity;
          const new_quantity = product_quantity - order_quantity;
          console.log(new_quantity);
          console.log("product: " + products.quantity);
          await updateProductQuantity({ id: productID, quantity: new_quantity }).unwrap();
        }
      }
    }};

    fetchOrderAndProduct();
  }, [orderID, triggerFetchOrder, triggerFetchProduct]);

  useEffect(() => {
    const verifyPayment = async () => {
      const toastId = toastManager.loading("Verifying payment...");
      try {
        const response = await paymentSuccess(orderID).unwrap();
        const paymentData = {
          id: response.pg_txnid,
          status: response.status_code === "2" ? "Success" : "Failed",
          updateTime: new Date(response.date_processed),
          currency: response.currency,
          paymentMethod: response.payment_processor,
          conversionRate: response.conversion_rate,
        };
        if (response.status_code === "2") {
          await updatePaymentStatus({ orderID, paymentData }).unwrap();
          toastManager.updateStatus(toastId, {
            type: "success",
            render: "Payment verified successfully",
          });
          setTimeout(() => {
            router.push("/orders");
          }, 2000);
        } else {
          await updatePaymentStatus({ orderID, paymentData }).unwrap();
          throw new Error(
            "Payment Failed. Please contact support for more info."
          );
        }
      } catch (error) {
        const errorMessage =
          error?.data?.message || "Payment verification failed";
        toastManager.updateStatus(toastId, {
          type: "error",
          render: errorMessage,
        });
        setTimeout(() => {
          router.push(`/orders/${orderID}`);
        }, 1500);
      }
    };
    if (orderID) {
      verifyPayment();
    }
  }, [orderID]);

  return null;
};

export default PaymentSuccessful;
