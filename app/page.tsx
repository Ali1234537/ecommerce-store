"use client";
import ProductCard from "@/components/ProductCards";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";


function MainScreen() {
  
  const products = useAppSelector((state)=>(
    state.product.Products
  ))

  return (
    <div className="min-h-screen bg-red-200">

      
      <div className="relative h-[300px] w-full sm:h-[350px] md:h-[400px]">
        <Image
          src="/banner.jpg"
          alt="Banner"
          fill
          className="object-cover"
        />

        
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-4 text-center text-white">
          <h1 className="mb-4 text-2xl font-bold sm:text-3xl md:text-5xl">
            Welcome to  E-commerce Store
          </h1>

          <p className="mb-6 max-w-xl text-sm sm:mb-8 sm:text-base md:text-lg">
            Discover a wide range of products at unbeatable prices.
          </p>

          <Link
            href="/products"
            className="rounded bg-blue-500 px-5 py-3 text-sm hover:bg-blue-600 sm:px-6 sm:text-base"
          >
            View Products
          </Link>
        </div>
      </div>
      <section className="px-4 py-6 sm:p-6 md:p-8">
        <h2 className="mx-auto w-fit max-w-full rounded-t-lg bg-gray-800 px-4 py-2 text-center text-xl font-bold text-white sm:px-6 sm:text-2xl">Featured Products</h2>
        <div className="mt-6 grid grid-cols-1 justify-items-center gap-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">

          {products.slice(10,20).map((product)=>(
            <ProductCard
             key={product.id}
             product={product}
             
             />
          ))}

           

        </div>
      </section>



    </div>
  );
}

export default MainScreen;