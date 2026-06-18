import { useState, useEffect, useRef } from "react";
import authService from "../../services/authService";
import "./Dashboard.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell
} from "recharts";

function Dashboard() {

    const [dashboard, setDashboard] = useState({
        totalIncome: 0,
        totalExpense: 0,
        currentBalance: 0,
        totalTransactions: 0,
        highestIncome: 0,
        highestExpense: 0,
        transactions: []
    });


    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("Income");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState("All");
    const [sort, setSort] = useState("Newest");
    const [editId, setEditId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const today = new Date();

    const lastYear = new Date();
    lastYear.setFullYear(today.getFullYear() - 1);

    const [fromDate, setFromDate] = useState(
        lastYear.toISOString().split("T")[0]
    );

    const [toDate, setToDate] = useState(
        today.toISOString().split("T")[0]
    );

    const [analyticsCategory, setAnalyticsCategory] = useState("All");

    const [analyticsData, setAnalyticsData] = useState({
        monthlyData: [],
        categoryData: []
    });
    const titleRef = useRef(null);
    const amountRef = useRef(null);
    const typeRef = useRef(null);
    const categoryRef = useRef(null);
    const descriptionRef = useRef(null);
    const dateRef = useRef(null);




    useEffect(() => {

        loadDashboard();

        loadCategories();

    }, []);

    useEffect(() => {

        loadAnalytics();

    }, [fromDate, toDate, analyticsCategory]);
    useEffect(() => {
        if (showModal) {
            setTimeout(() => {
                titleRef.current?.focus();
            }, 100);
        }
    }, [showModal]);

    const loadDashboard = async () => {

        const result = await authService.getDashboard();

        if (result.success) {

            setDashboard(result);

        } else {

            alert(result.message);

        }

    };



    const loadCategories = async () => {

        const result = await authService.getCategories();

        if (result.success) {

            setCategories(result.data);

        }

    };

    const loadAnalytics = async () => {

        const result = await authService.getAnalytics(
            fromDate,
            toDate,
            analyticsCategory
        );

        if (result.success) {

            setAnalyticsData({
                monthlyData: result.monthlyData,
                categoryData: result.categoryData
            });

        } else {

            toast.error(result.message);

        }

    };




    const handleAddTransaction = async () => {
        console.log("Button Clicked");



        const user = JSON.parse(localStorage.getItem("user"));




        if (!title.trim()) {
            return toast.warning("Please enter transaction title");
        }

        if (!amount || Number(amount) <= 0) {
            return toast.warning("Amount must be greater than 0");
        }

        if (!category) {
            return toast.warning("Please select a category");
        }

        if (!date) {
            return toast.warning("Please select a date");
        }



        const transaction = {
            title,
            amount: Number(amount),
            type,
            category,
            description,
            date,
            userId: user._id
        };

        const result = await authService.addTransaction(transaction);

        if (result.success) {

            toast.success(result.message);

            loadDashboard();
            setShowModal(false);
            setTitle("");
            setAmount("");
            setType("Income");
            setCategory("");
            setDescription("");
            setDate("");

        } else {

            toast.error(result.message);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Do you want to delete this transaction?"
        );

        if (!confirmDelete) {
            return;
        }

        const result = await authService.deleteTransaction(id);

        if (result.success) {

            toast.success("Transaction Deleted Successfully");

            loadDashboard();

        } else {

            toast.error(result.message);

        }

    };




    const handleEdit = (transaction) => {

        setEditId(transaction._id);

        setIsEditing(true);
        setShowModal(true);
        setTitle(transaction.title);

        setAmount(transaction.amount);

        setType(transaction.type);

        setCategory(transaction.category);

        setDescription(transaction.description);

        setDate(transaction.date.split("T")[0]);

    };


    const handleUpdateTransaction = async () => {


        const user = JSON.parse(localStorage.getItem("user"));




        if (!title.trim()) {
            return toast.warning("Please enter transaction title");
        }

        if (!amount || Number(amount) <= 0) {
            return toast.warning("Amount must be greater than 0");
        }

        if (!category) {
            return toast.warning("Please select a category");
        }

        if (!date) {
            return toast.warning("Please select a date");
        }



        const transaction = {
            title,
            amount: Number(amount),
            type,
            category,
            description,
            date,
            userId: user._id
        };

        const result = await authService.updateTransaction(
            editId,
            transaction
        );

        if (result.success) {

            toast.success("Transaction Updated Successfully");

            loadDashboard();
            setShowModal(false);
            setTitle("");
            setAmount("");
            setType("Income");
            setCategory("");
            setDescription("");
            setDate("");

            setEditId(null);
            setIsEditing(false);

        } else {

            toast.error(result.message);

        }

    };

    const chartData = analyticsData.categoryData;


    const barData = [
        {
            name: "Income",
            amount: dashboard.totalIncome,
        },
        {
            name: "Expense",
            amount: dashboard.totalExpense,
        },
    ];

    const COLORS = [
        "#3b82f6",
        "#22c55e",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
        "#06b6d4",
        "#ec4899",
        "#84cc16"
    ];

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <h1>
                    Welcome Back, {user?.name}
                </h1>

                <p>
                    Manage your finances efficiently.
                </p>

            </div>

            <div className="summary-cards">

                <div className="card">
                    <h2>Current Balance</h2>
                    <h3>₹ {dashboard.currentBalance}</h3>
                </div>

                <div className="card">
                    <h2>Total Income</h2>
                    <h3>₹ {dashboard.totalIncome}</h3>
                </div>

                <div className="card">
                    <h2>Total Expense</h2>
                    <h3>₹ {dashboard.totalExpense}</h3>
                </div>

                <div className="card">
                    <h2>Savings</h2>
                    <h3>
                        ₹ {dashboard.currentBalance}
                    </h3>
                </div>



                <div className="card">
                    <h2>Total Transactions</h2>
                    <h3>{dashboard.totalTransactions}</h3>
                </div>

                <div className="card">
                    <h2>Highest Income</h2>
                    <h3>₹ {dashboard.highestIncome}</h3>
                </div>

                <div className="card">
                    <h2>Highest Expense</h2>
                    <h3>₹ {dashboard.highestExpense}</h3>
                </div>
            </div>



            <hr />
















            <div className="analytics-section">

                <div className="analytics-card">

                    <div className="analytics-header">

                        <h2>🥧 Expense by Category</h2>

                        <div className="analytics-filters">

                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />

                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            />

                            <select
                                value={analyticsCategory}
                                onChange={(e) => setAnalyticsCategory(e.target.value)}
                            >

                                <option value="All">All Categories</option>

                                {categories.map((category) => (

                                    <option
                                        key={category._id}
                                        value={category.name}
                                    >
                                        {category.name}
                                    </option>

                                ))}

                            </select>

                        </div>

                    </div>

                    <div style={{ width: "100%", height: "280px" }}>

                        <ResponsiveContainer>

                            <PieChart>

                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={90}
                                    dataKey="value"
                                    label
                                >

                                    {chartData.map((entry, index) => (

                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                        />

                                    ))}

                                </Pie>

                                <Tooltip />



                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>




                <div className="analytics-card">

                    <div className="analytics-header">

                        <h2>📈 Daily Expense Trend</h2>

                        <div className="analytics-filters">

                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />

                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            />

                            <select
                                value={analyticsCategory}
                                onChange={(e) => setAnalyticsCategory(e.target.value)}
                            >
                                <option value="All">All Categories</option>

                                {categories.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category.name}
                                    >
                                        {category.name}
                                    </option>
                                ))}

                            </select>

                        </div>

                    </div>

                    <div style={{ width: "100%", height: "320px" }}>

                        <ResponsiveContainer width="100%" height="100%">

                            <AreaChart
                                data={analyticsData.monthlyData}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    left: 0,
                                    bottom: 5
                                }}
                            >

                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

                                <XAxis
                                    dataKey="day"
                                    stroke="#ffffff"
                                />

                                <YAxis
                                    stroke="#ffffff"
                                />

                                <Tooltip
                                    formatter={(value) => [`₹${value}`, "Expense"]}
                                />


                                <Area
                                    type="monotone"
                                    dataKey="expense"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fill="url(#expenseGradient)"
                                    dot={{ r: 5 }}
                                    activeDot={{ r: 8 }}
                                />




                            </AreaChart>

                            <defs>

                                <linearGradient
                                    id="expenseGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >

                                    <stop
                                        offset="5%"
                                        stopColor="#3b82f6"
                                        stopOpacity={0.8}
                                    />

                                    <stop
                                        offset="95%"
                                        stopColor="#3b82f6"
                                        stopOpacity={0}
                                    />

                                </linearGradient>

                            </defs>

                        </ResponsiveContainer>

                    </div>

                </div>










            </div>

            <hr />



            <hr />

            <div className="table-header">

                <h2>Recent Transactions</h2>

                <div className="add-btn-container">

                    <button
                        className="add-btn"
                        onClick={() => {

                            setIsEditing(false);

                            setEditId(null);

                            setTitle("");

                            setAmount("");

                            setType("Income");

                            setCategory("");

                            setDescription("");

                            setDate(new Date().toISOString().split("T")[0]);

                            setShowModal(true);

                        }}
                    >
                        +
                    </button>

                    <span className="add-tooltip">
                        Add Transaction
                    </span>

                </div>

            </div>




            <div className="search-filter-section">

                <input
                    type="text"
                    placeholder="🔍 Search by Title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">Filter : All</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="Newest">Sort : Newest</option>
                    <option value="Oldest">Oldest</option>
                    <option value="Highest">Highest Amount</option>
                    <option value="Lowest">Lowest Amount</option>
                </select>

            </div>
            <table border="1" cellPadding="10">

                <thead>

                    <tr>

                        <th>Title</th>

                        <th>Amount</th>

                        <th>Type</th>

                        <th>Category</th>

                        <th>Date</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {dashboard.transactions
                        .filter((transaction) =>
                            transaction.title
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .filter((transaction) =>
                            filter === "All"
                                ? true
                                : transaction.type === filter
                        )




                        .sort((a, b) => {

                            switch (sort) {

                                case "Newest":
                                    return new Date(b.date) - new Date(a.date);

                                case "Oldest":
                                    return new Date(a.date) - new Date(b.date);

                                case "Highest":
                                    return b.amount - a.amount;

                                case "Lowest":
                                    return a.amount - b.amount;

                                default:
                                    return 0;

                            }

                        })




                        .map((transaction) => (

                            <tr key={transaction._id}>

                                <td>{transaction.title}</td>

                                <td>₹ {transaction.amount}</td>

                                <td>{transaction.type}</td>

                                <td>{transaction.category}</td>

                                <td>{transaction.date.split("T")[0]}</td>

                                <td>

                                    <div className="action-buttons">

                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEdit(transaction)}
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(transaction._id)}
                                        >
                                            <FaTrash />
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                </tbody>

            </table>


            {showModal && (

                <div className="modal-overlay">

                    <div className="modal">

                        <div className="modal-header">

                            <h2>
                                {isEditing ? "Update Transaction" : "Add Transaction"}
                            </h2>

                            <button
                                type="button"
                                className="close-btn"
                                onClick={() => setShowModal(false)}
                            >
                                ✖
                            </button>

                        </div>

                        <div className="form-grid">

                            <input
                                ref={titleRef}
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        amountRef.current.focus();
                                    }
                                }}
                            />

                            <input
                                ref={amountRef}
                                type="number"
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        typeRef.current.focus();
                                    }
                                }}
                            />

                            <select
                                ref={typeRef}
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        categoryRef.current.focus();
                                    }
                                }}
                            >
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                            </select>

                            <select
                                ref={categoryRef}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        descriptionRef.current.focus();
                                    }
                                }}
                            >
                                <option value="">Select Category</option>

                                {categories
                                    .filter((item) => item.type === type)
                                    .map((item) => (
                                        <option
                                            key={item._id}
                                            value={item.name}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                            </select>

                        </div>






                        <input
                            ref={descriptionRef}
                            className="full-width"
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    dateRef.current.focus();
                                }
                            }}
                        />

                        <input
                            ref={dateRef}
                            className="full-width"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {

                                    if (isEditing) {
                                        handleUpdateTransaction();
                                    } else {
                                        handleAddTransaction();
                                    }

                                }
                            }}
                        />






                        <div className="modal-buttons">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={() => {

                                    if (isEditing) {

                                        handleUpdateTransaction();

                                    } else {

                                        handleAddTransaction();

                                    }

                                }}
                            >
                                {isEditing
                                    ? "Update Transaction"
                                    : "Add Transaction"}
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div >
    );
}

export default Dashboard;