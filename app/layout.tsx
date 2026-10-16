import type { Metadata } from "next";
import ReduxProvider from "@/redux/Provider";
import "./globals.css";
import Navbar from "@/components/Navbar";
 

/*export const metadata:Metadata={
    title:"Ecommerce",
    description:"Ecommerce website",
};*/

export default function RootLayout({
    children,
}:Readonly<{
    children:React.ReactNode;
}>){
  return(
    <html lang="en">
      <body>
        <ReduxProvider>
          
          <Navbar/>
           
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
