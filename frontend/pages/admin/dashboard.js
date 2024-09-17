import { useEffect, useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { subMonths, startOfMonth, endOfMonth, format } from "date-fns";
import { useLazyFetchSellReportQuery } from "@/store/slices/api/orderApiSlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "@/components/Admin/Admin-Sidebar";
import { withAuth } from "@/utils/withAuth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [sellReportData, setSellReportData] = useState([]);
  const [fetchSellReport] = useLazyFetchSellReportQuery();

  useEffect(() => {
    const fetchMonthlyReports = async () => {
      const endDate = new Date();
      let reports = [];

      const fetchReportForMonth = async (monthOffset) => {
        const monthEndDate = endOfMonth(subMonths(endDate, monthOffset));
        const monthStartDate = startOfMonth(subMonths(endDate, monthOffset));
        monthStartDate.setHours(0, 0, 0, 0);
        monthEndDate.setHours(23, 59, 59, 999);
        const formattedStartDate = format(
          monthStartDate,
          "yyyy-MM-dd'T'HH:mm:ss.SSS"
        );
        const formattedEndDate = format(
          monthEndDate,
          "yyyy-MM-dd'T'HH:mm:ss.SSS"
        );

        const res = await fetchSellReport({
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        }).unwrap();

        return { month: formattedStartDate, report: res };
      };

      const promises = [];
      for (let i = 0; i < 6; i++) {
        promises.push(fetchReportForMonth(i));
      }

      reports = await Promise.all(promises);
      setSellReportData(reports);
    };

    fetchMonthlyReports();
  }, [fetchSellReport]);

  const totalIncome = useMemo(() => {
    return sellReportData.reduce((acc, report) => {
      return acc + report.report.totalRevenue;
    }, 0);
  }, [sellReportData]);

  const totalProductsSold = useMemo(() => {
    return sellReportData.reduce((acc, report) => {
      return acc + report.report.totalProductsSold;
    }, 0);
  }, [sellReportData]);

  // Calculate total sold this month
  const totalSoldThisMonth = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentMonthData = sellReportData.find((item) => {
      const month = new Date(item.month).getMonth();
      return month === currentMonth;
    });

    return currentMonthData ? currentMonthData.report.totalProductsSold : 0;
  }, [sellReportData]);

  const totalRevenueData = sellReportData.map(
    (item) => item.report.totalRevenue
  );
  const totalProductsSoldData = sellReportData.map(
    (item) => item.report.totalProductsSold
  );

  const maxRevenue = Math.max(...totalRevenueData);
  const maxProductsSold = Math.max(...totalProductsSoldData);

  const revenuePercentages = totalRevenueData.map((value) =>
    maxRevenue ? (value / maxRevenue) * 100 : 0
  );
  const productsSoldPercentages = totalProductsSoldData.map((value) =>
    maxProductsSold ? (value / maxProductsSold) * 100 : 0
  );

  const data = {
    labels: sellReportData.map((item) =>
      new Date(item.month).toLocaleString("default", { month: "long" })
    ),
    datasets: [
      {
        label: "Income",
        data: revenuePercentages,
        backgroundColor: "rgba(34, 197, 94)", // Greenish background
        // borderColor: "rgba(34, 197, 94)", // Strong green border
        borderWidth: 2,
      },
      {
        label: "Total Products Sold",
        data: productsSoldPercentages,
        backgroundColor: "rgba(59, 130, 246)", // Blueish background
        // borderColor: "rgba(59, 130, 246, 1)", // Strong blue border
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income and Product Sales Chart",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              const maxValue =
                context.dataset.label === "Income"
                  ? maxRevenue
                  : maxProductsSold;
              const suffix =
                context.dataset.label === "Income" ? "BDT" : "units";
              label += `${
                (parseInt(context.parsed.y) * maxValue) / 100
              } ${suffix}`;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-10 text-black">
      <h3 className="py-4 text-3xl font-extrabold mb-10 text-gray-900 text-center tracking-wide shadow-sm">
  Admin Dashboard
</h3>

        {/* <p className="mb-8 text-gray-600">
          Welcome to the Admin Dashboard. Here you can manage users, view
          reports, and more.
        </p> */}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">
          <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg rounded-sm p-8">
            <h2 className="text-2xl font-semibold mb-4">Total Revenue</h2>
            <p className="text-3xl font-bold">{totalIncome} BDT</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-400 text-white shadow-lg rounded-sm p-8">
            <h2 className="text-2xl font-semibold mb-4">Total Products Sold</h2>
            <p className="text-3xl font-bold">{totalProductsSold}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-400 text-white shadow-lg rounded-sm p-8">
            <h2 className="text-2xl font-semibold mb-4">Total Sold This Month</h2>
            <p className="text-3xl font-bold">{totalSoldThisMonth}</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white shadow-lg rounded-sm p-8 text-center">
          {/* <h2 className="text-xl font-semibold mb-6 text-gray-700">Sales Report</h2> */}
          <div className="p-4">
            <Bar data={data}  options={options} height={100} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard, { requireLogin: true, requireAdmin: true });
