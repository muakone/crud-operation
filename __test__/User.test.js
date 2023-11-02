const axios = require("axios");

const BASE_URL = "https://shop-items-qzr1.onrender.com";

let token = ""; 
let taskID = "";

describe("Testing Task Project Endpoints", () => {
  test("Registration Endpoint", async () => {
    const userData = {
      full_name: "authTest",
      username: "authTest",
      password: "authTest",
      role: "admin",
    };
    const response = await axios.post(`${BASE_URL}/v1/auth/register`, userData);
    expect(response.data.isRequestSuccesful).toBe(true);
  });

  test("Login Endpoint", async () => {
    const loginData = {
      username: "authTest",
      password: "authTest",
    };
    const response = await axios.post(`${BASE_URL}/v1/auth/login`, loginData);
    token = response.data.token;
    expect(response.status).toBe(200);
  });

  test("Adding a New Task", async () => {
    global.token = token;
    const newTask = {
      name: "Samsung tv",
      description: "a television",
      price: 100000,
      isInStock: true,
    };
    const response = await axios.post(`${BASE_URL}/v1/shopitems`, newTask, {
      headers: { Authorization: `Bearer ${token}` },
    });
    taskID = response.data.newShopItem._id;
    expect(response.status).toBe(200);
  });

  test("Getting the List of Tasks", async () => {
    global.token = token;
    const response = await axios.get(`${BASE_URL}/v1/shopitems`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.status).toBe(200);
  });

  test("Delete Task Endpoint", async () => {
    global.token = token;
    const response = await axios.delete(`${BASE_URL}/v1/shopitems/${taskID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(response.status).toBe(200);
  });
});
