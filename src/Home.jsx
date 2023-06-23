import React, { useEffect, useState } from 'react'
const snacksData = [
    {
        id: 1,
        product_name: "Granola Bar",
        product_weight: "21g",
        price: 299,
        calories: 150,
        ingredients: ["Oats", "Honey", "Nuts", "Dried Fruits"]
    },
    {
        id: 2,
        product_name: "Fruit and Nut Mix",
        product_weight: "73g",
        price: 749,
        calories: 353,
        ingredients: [
            "Almonds",
            "Cashews",
            "Dried Cranberries",
            "Dried Blueberries"
        ]
    },
    {
        id: 3,
        product_name: "Veggie Chips",
        product_weight: "28g",
        price: 279,
        calories: 130,
        ingredients: ["Sweet Potatoes", "Beets", "Kale", "Sea Salt"]
    },
    {
        id: 4,
        product_name: "Protein Balls",
        product_weight: "100g",
        price: 499,
        calories: 318,
        ingredients: ["Dates", "Almond Butter", "Protein Powder", "Chia Seeds"]
    }
];

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
        <div className='flex justify-center items-center p-10 flex-col gap-10'>
            <input
                type="text"
                placeholder="Search snacks..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <table className='border m-10 p-10'>
                <thead className=''>
                    <tr>
                        <th onClick={() => handleSort("id")}>ID</th>
                        <th onClick={() => handleSort("product_name")}>Product Name</th>
                        <th onClick={() => handleSort("product_weight")}>Product Weight</th>
                        <th onClick={() => handleSort("price")}>Price</th>
                        <th onClick={() => handleSort("calories")}>Calories</th>
                        <th onClick={() => handleSort("ingredients")}>Ingredients</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {filteredSnacks.map((snack) => (
                        <tr key={snack.id} className='border'>
                            <td className='border p-10'>{snack.id}</td>
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
    )
}

export default Home
