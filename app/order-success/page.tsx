import Link from "next/link";

function Order() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center p-8">
      <div className="w-full max-w-lg rounded-lg border p-8 text-center shadow-sm">

        <h1 className="text-3xl font-bold text-green-600">
          Order Placed Successfully!
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for your order.
        </p>

        <p className="mt-2 text-gray-600">
          Your order has been received and is being processed.
        </p>

        <div className="mt-8 flex justify-center gap-4">

          <Link
            href="/products"
            className="rounded bg-black px-5 py-3 text-white"
          >
            Continue Shopping
          </Link>

          <Link
            href="/orders"
            className="rounded border px-5 py-3"
          >
            View Orders
          </Link>

        </div>

      </div>
    </main>
  );
}

export default Order;