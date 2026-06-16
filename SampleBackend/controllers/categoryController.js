import Category from "../models/categoryModel.js";

// Get All Categories
export const getCategories = async (req, res) => {

    try {

        const categories = await Category.find();

        return res.status(200).json({
            success: true,
            data: categories
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Add Category
export const addCategory = async (req, res) => {

    try {

        const category = await Category.create(req.body);

        console.log("====== CATEGORY ADDED ======");
        console.log(category.name);
        console.log("============================");

        return res.status(201).json({
            success: true,
            data: category
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};