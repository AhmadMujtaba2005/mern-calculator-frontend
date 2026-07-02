const BASE_URL = "http://localhost:5000/api/history";

// GET active history
export const getHistory = async () => {
    const res = await fetch(`${BASE_URL}/active`);
    if (!res.ok) throw new Error("Failed to fetch history");
    return res.json();
};

// POST save a calculation 
export const saveCalculation = async (number1, operationType, number2) => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number1, operationType, number2 }),
    });
    if (!res.ok) throw new Error("Failed to save calculation");
    return res.json();
};

// GET only calculations from the last 24 hours
export const filterHistoryByDay = async () => {
    const res = await fetch(`${BASE_URL}/filter-day`);
    if (!res.ok) throw new Error("Failed to fetch filtered history");
    return res.json();
};

// DELETE a single history item by id
export const deleteCalculation = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete history item");
    return res.json();
};