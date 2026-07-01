const BASE_URL = "http://localhost:5000/api/history";

// GET active history (non-deleted) for frontend
export const getHistory = async () => {
    const res = await fetch(`${BASE_URL}/active`);
    if (!res.ok) throw new Error("Failed to fetch history");
    return res.json();
};

// POST save a calculation
export const saveCalculation = async (expression, result) => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ equation: expression, result: String(result) }),
    });
    if (!res.ok) throw new Error("Failed to save calculation");
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