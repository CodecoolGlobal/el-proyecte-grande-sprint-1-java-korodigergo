import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import {
  faCircleChevronLeft,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

export default function ShoppingList() {
  const [items, setItems] = useState([]);
  const [bought, setBought] = useState(false);
  const [productName, setInputName] = useState("");
  const [userId, setUserId] = useState(0);
  const [userToken, setUserToken] = useState("");
  const [gotPremium, setGotPremium] = useState(false);

  interface item {
    itemId: number;
    name: string;
    quantity: number;
    isBought: boolean;
  }

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userId")!);
    const token = JSON.parse(localStorage.getItem("jwt")!);
    const roles = JSON.parse(localStorage.getItem("roles")!);
    setUserToken(token);
    if (roles.includes("ROLE_PREMIUM")) {
      setGotPremium(true);
    }
    if (id > 0) {
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    if (userId > 0) {
      fetchItems();
    }
  }, [userId]);

  async function fetchItems() {
    const response = await fetch(`/api/shopping/${userId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (!response.ok) {
      console.log("o ooo");
    }
    const items = await response.json();

    setItems(items);
  }

  async function addItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newItem = {
      name: productName,
    };
    try {
      const response = await fetch(`/api/shopping/${userId}`, {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        fetchItems();
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function updateBought(id: number) {
    setBought(!bought);
    const response = await fetch(
      `/api/shopping/${userId}/bought/${id}?isBought=${bought}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    if (response.ok) {
      console.log("ok");
      fetchItems();
      setGotPremium(true);
    }
  }

  async function handleBuyPremium(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(userToken);
    const response = await fetch(`/api/user/subscribe/premium/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const data = await response.json();
    setGotPremium(true);

    const rolesString = localStorage.getItem("roles");
    const roles: string[] = rolesString ? JSON.parse(rolesString) : [];

    // Push the new role into the array
    roles.push("ROLE_PREMIUM");

    // Store the updated array back into localStorage
    localStorage.setItem("roles", JSON.stringify(roles));
    console.log(data);
  }

  async function handleIncreaseQuantity(id: number, quantity: number){
    try {
      const response = await fetch(`/api/shopping/${userId}/quantity/${id}?quantity=${quantity}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
  
      if (response.ok) {
        fetchItems(); // Refresh the items list
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }
  
  async function handleDecreaseQuantity(id: number, quantity: number){
    try {
      const response = await fetch(`/api/shopping/${userId}/quantity/${id}?quantity=${quantity}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
  
      if (response.ok) {
        fetchItems(); // Refresh the items list
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }

  return (
    <>
      {!gotPremium ? (
        <div className="no-premium">
          <h2>THIS FEATURE IS ONLY ACCESSIBLE FOR PREMIUM USERS</h2>
          <form action="" onSubmit={(e) => handleBuyPremium(e)}>
            <button className="premium-btn">BUY PREMIUM</button>
          </form>
        </div>
      ) : (
        <>
          <div id="add-new-item">
            <form onSubmit={(e) => addItem(e)}>
              <div id="new">
                <input
                  type="text"
                  placeholder="Add new item..."
                  onChange={(e) => setInputName(e.target.value)}
                />
                <button className="new-item-btn">
                  <FontAwesomeIcon icon={faCirclePlus} />
                </button>
              </div>
            </form>
          </div>
          <div id="shopping-list-container">
            <table id="shopping-list-table">
              <thead>
                <tr>
                  <th>Bought</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {items
                  .sort((a: item, b: item) => a.itemId - b.itemId)
                  .map((item: item) => (
                    <React.Fragment key={item.itemId}>
                      <tr>
                        <td>
                          <input
                            type="checkbox"
                            checked={item.isBought}
                            onClick={() => updateBought(item.itemId)}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>
                          <div className="item-quantity">
                            <FontAwesomeIcon
                            onClick={() => handleDecreaseQuantity(item.itemId, item.quantity - 1)}
                              className="decr-btn"
                              icon={faCircleChevronLeft}
                            />
                            <span>{item.quantity}</span>
                            <FontAwesomeIcon
                              onClick={() => handleIncreaseQuantity(item.itemId, item.quantity + 1)}
                              className="incr-btn"
                              icon={faCircleChevronRight}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3}>
                          <Divider
                            variant="middle"
                            style={{ background: "white" }}
                            className="divider"
                          />
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}