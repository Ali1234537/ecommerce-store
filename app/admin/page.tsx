"use client"
import { LoaderCircle } from "lucide-react";
import { useState, FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addProduct, removeProduct, editProduct } from "@/redux/features/product/productSlice";

function Admin() {
  const [checkUser, setCheckUser] = useState(true);

  useEffect(() => {
    const isadmin = localStorage.getItem("Admin") === "true";
    if (!isadmin) {
      window.location.replace("/isAdmin");
    } else {
      //setCheckUser(false);
      setTimeout(()=>{
        setCheckUser(false)
      },2000)
    }
  }, []);


  const products = useAppSelector((state) => state.product.Products);
  const dispatch = useAppDispatch();

  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [stock, setStock] = useState("");

  const [category, setCategory] = useState("");

  const [detail, setDetail] = useState("");

  const [image, setImage] = useState("");

  function handleProduct(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const productToAdd = {
      id: editingProductId ?? Math.max(0, ...products.map((product) => product.id)) + 1,
      name: name.trim(),
      price: Number(price),
      stock: Number(stock),
      category: category.trim(),
      detail: detail.trim(),
      image: image.trim(),
    };

    if (editingProductId !== null) {
      dispatch(editProduct(productToAdd));
      setEditingProductId(null);
    } else {
      dispatch(addProduct(productToAdd));
    }

    setName("");
    setPrice("");
    setStock("");
    setCategory("");
    setDetail("");
    setImage("");
    setEditingProductId(null);

  }

  function handleLogout() {
    localStorage.removeItem("Admin");
    window.location.replace("/isAdmin")
  }
  if (checkUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <button type="button"
          title="Logout from Admin"
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 cursor-pointer">
            Logout
          </button>
        </div>
        <p className="mb-8 text-gray-600">
          Manage Products
        </p>


        <form onSubmit={handleProduct} className="mb-10 rounded-2xl border border-gray-200 bg-white">
          <h2 className="mb-5 text-xl font-semibold text-gray-800">
            {editingProductId !== null ? "Edit Product" : "Add Product"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input required
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border border-gray-300 p-3 text-gray-700"
            />
            <input
              required
              type="number"
              min="0"
              step="0.01"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded-lg border border-gray-300 p-3 text-gray-700"
            />
            <input
              required
              type="number"
              min="0"
              step="1"
              placeholder="Stock Quantity"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-blue-500"
            />
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-gray-300 p-3 text-gray-800 outline-none focus:border-blue-500 cursor-pointer">
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothes</option>
              <option value="Footwear">Footwear</option>
              <option value="Bags">Bags</option>
              <option value="Accessories">Accessories</option>
              <option value="Beauty">Beauty</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Sports">Sports</option>
              <option value="Toys">Toys</option>
              <option value="Grocery">Grocery</option>
            </select>
            <input
              required
              type="url"
              placeholder="Product image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-blue-500 sm:col-span-2"
            />
            <textarea
              required
              placeholder="Product description"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-blue-500 sm:col-span-2"
              rows={3}
            />
          </div>

          <button type="submit" className="mt-5 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
            {editingProductId !== null ? "Save Edit Product" : "Add Product"}
          </button>
        </form>
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-gray-900">
              Manage Products
            </h2>

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Total Products: {products.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="border-b bg-gray-50 text-sm text-gray-600">
                  <th className="p-3">Product</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    <td className="p-3 font-medium text-gray-900">
                      {product.name}
                    </td>

                    <td className="p-3 text-gray-700">
                      ${product.price.toLocaleString()}
                    </td>

                    <td className="p-3 text-gray-700">
                      {product.stock}
                    </td>

                    <td className="p-3 text-gray-700">
                      {product.category}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button type="button"
                          onClick={() => {
                          setEditingProductId(product.id)
                          setName(product.name)
                          setPrice(String(product.price))
                          setStock(String(product.stock))
                          setCategory(product.category)
                          setDetail(product.detail)
                          setImage(product.image)
                        }} className="rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 cursor-pointer ">
                        Edit Product
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          dispatch(removeProduct(product.id));
                        }}
                        className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200 cursor-pointer "
                      >
                        Remove
                      </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {products.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-6 text-center text-gray-500"
                    >
                      No products available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Admin;