import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ITEM_BY_NAME } from "../GraphQL/Queries";

const GetItemByName: React.FC = () => {
  const [itemName, setItemName] = useState<string>("");
  const [fetchItem, { loading, error, data }] = useLazyQuery(GET_ITEM_BY_NAME, {
    variables: { name: itemName },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchItem();
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>Search Item by Name</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
          style={{ marginBottom: "10px", width: "100%" }}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading item...</p>}
      {error && <p>Error loading item by name.</p>}
      {data && data.getItemByName && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <h2>Item Details</h2>
          <p>
            <strong>Name:</strong> {data.getItemByName.name}
          </p>
          <p>
            <strong>Image URL:</strong>
            {data.getItemByName.itemImg}
          </p>
          <p>
            <strong>Description:</strong> {data.getItemByName.desc}
          </p>
          <p>
            <strong>Amount:</strong> {data.getItemByName.amount}
          </p>
          <p>
            <strong>Price:</strong> {data.getItemByName.price}
          </p>
          <p>
            <strong>Cost Price:</strong> {data.getItemByName.costPrice}
          </p>
        </div>
      )}
    </div>
  );
};

export default GetItemByName;
