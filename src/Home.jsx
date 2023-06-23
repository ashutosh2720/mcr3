import React, { useEffect, useState } from "react";
import { snacksData } from "./snaks";
const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortedColumn, setSortedColumn] = useState("");
    const [sortedOrder, setSortedOrder] = useState("");

    const [filteredSnacks, setFilteredSnacks] = useState(snacksData);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const filtered = snacksData.filter(
            (snack) =>
                snack.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                snack.ingredients
                    .join(" ")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
        setFilteredSnacks(filtered);
    }, [searchTerm]);

    const handleSort = (column) => {
        if (column === sortedColumn) {
            // Reverse the sorting order 
            setSortedOrder(sortedOrder === "asc" ? "desc" : "asc");
        } else {
            // Set the sorting column and order
            setSortedColumn(column);
            setSortedOrder("asc");
        }
    };

    useEffect(() => {
        if (sortedColumn) {
            const sorted = [...filteredSnacks].sort((a, b) => {
                const aValue = a[sortedColumn];
                const bValue = b[sortedColumn];

                if (aValue < bValue) {
                    return sortedOrder === "asc" ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortedOrder === "asc" ? 1 : -1;
                }
                return 0;
            });

            setFilteredSnacks(sorted);
        }
    }, [sortedColumn, sortedOrder]);
    return (
        <div className="flex justify-center items-center p-10 flex-col gap-10">
            <h1 className="text-3xl font-bold mb-6">Snacks App</h1>
            <input
                type="text"
                placeholder="Search snacks..."
                value={searchTerm}
                onChange={handleSearch}
                className="p-2  border-black-600 rounded mb-4 bg-cyan-600 text-white"

            />
            <table className="w-full border-collapse">
                <thead className="p-10">
                    <tr className="cursor-pointer py-2 px-4 bg-cyan-200 text-left border border-black">
                        <th className="cursor-pointer py-2 px-4 bg-cyan-200 text-left" onClick={() => handleSort("id")} >ID</th>
                        <th className="cursor-pointer py-2 px-4 bg-cyan-200 text-left" onClick={() => handleSort("product_name")}>Product Name</th>
                        <th className="cursor-pointer py-2 px-4 bg-cyan-200 text-left" onClick={() => handleSort("product_weight")}>Product Weight</th>
                        <th className="cursor-pointer py-2 px-4 bg-cyan-200 text-left" onClick={() => handleSort("price")}>Price</th>
                        <th className="cursor-pointer py-2 px-4 bg-cyan-200 text-left" onClick={() => handleSort("calories")}>Calories</th>
                        <th className="cursor-pointer py-2 px-4 bg-cyan-200 text-left" onClick={() => handleSort("ingredients")}>Ingredients</th>
                    </tr>
                </thead>
                <tbody className="">
                    {filteredSnacks.map((snack) => (
                        <tr key={snack.id} className="border border-black">
                            <td className="border-black p-10">{snack.id}</td>
                            <td>{snack.product_name}</td>
                            <td>{snack.product_weight}</td>
                            <td>{snack.price}</td>
                            <td>{snack.calories}</td>
                            <td>{snack.ingredients.join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
