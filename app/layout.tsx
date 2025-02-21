"use client"

import React from "react";
import { Amplify } from "aws-amplify";
import "./app.css";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "@/amplify_outputs.json";
import { Bebas_Neue } from "next/font/google";

Amplify.configure(outputs);

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>      
        <Authenticator>
          {children}
        </Authenticator>
      </body>
    </html>
  );
}