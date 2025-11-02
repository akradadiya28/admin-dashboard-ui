'use client'

import { productsData } from '@/data/products'

export default function ProductTable() {
  const products = productsData

  return (
    <div className="bg-[#F7F9FB] dark:bg-[#FFFFFF0D] rounded-2xl p-4 sm:p-6 h-full flex flex-col">
      <p className="text-xs sm:text-sm font-semibold text-black dark:text-white mb-3 sm:mb-4">
        Top Selling Products
      </p>
      <div className="overflow-x-auto flex-1 -mx-4 sm:-mx-6 px-4 sm:px-6">
        <table className="w-full text-xs sm:text-sm min-w-[500px]">
          <thead className="border-b border-black/10 dark:border-white/10">
            <tr className="text-black/40 dark:text-white/40">
              <th className="pb-3 text-left font-normal">Name</th>
              <th className="pb-3 text-right font-normal">Price</th>
              <th className="pb-3 text-right font-normal">Quantity</th>
              <th className="pb-3 text-right font-normal">Amount</th>
            </tr>
          </thead>
          <tbody className="text-black dark:text-white">
            {products.map((product, idx) => (
              <tr key={idx} className="">
                <td className="py-4">{product.name}</td>
                <td className="py-4 text-right">{product.price}</td>
                <td className="py-4 text-right">{product.quantity}</td>
                <td className="py-4 text-right">{product.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
