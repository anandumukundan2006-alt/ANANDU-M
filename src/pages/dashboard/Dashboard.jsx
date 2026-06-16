import { useEffect, useState } from "react";
import authService from "../../services/authService";
import "./Dashboard.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
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




    useEffect(() => {

        loadDashboard();

        loadCategories();

    }, []);

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

    const chartData = [
        {
            name: "Income",
            value: dashboard.totalIncome,
        },
        {
            name: "Expense",
            value: dashboard.totalExpense,
        },
    ];


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

    const COLORS = ["#22c55e", "#ef4444"];

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

                    <h2>📊 Expense Analytics</h2>

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

                                <Legend />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>




                <div className="analytics-card">

                    <h2>📈 Income vs Expense</h2>

                    <div style={{ width: "100%", height: "300px" }}>

                        <ResponsiveContainer>

                            <BarChart
                                data={barData}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    left: 0,
                                    bottom: 5,
                                }}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#334155"
                                />

                                <XAxis
                                    dataKey="name"
                                    stroke="#ffffff"
                                />

                                <YAxis
                                    stroke="#ffffff"
                                />

                                <Tooltip
                                    formatter={(value) => [`₹${value}`, "Amount"]}
                                />

                                <Legend />

                                <Bar
                                    dataKey="amount"
                                    radius={[10, 10, 0, 0]}
                                >

                                    <Cell fill="#22c55e" />

                                    <Cell fill="#ef4444" />

                                </Bar>

                            </BarChart>

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
                        onClick={() => setShowModal(true)}
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
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <input
                                type="number"
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />

                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                            </select>

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
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
                            className="full-width"
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <input
                            className="full-width"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
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