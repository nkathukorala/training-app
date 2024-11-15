//route file to handle http requests

import schema from "./schema";
import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Validate request body using Zod schema
    const validation = schema.safeParse(req.body);
    
    // Send validation errors if validation fails
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    // Forward the request to the external API
    const response = await fetch(
      "https://t5bzetvc0d.execute-api.us-west-2.amazonaws.com/dev/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "vkEeGJPk4T4LT6QZ5dWaO6so3ofj0gS82jx2uj3L",
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: data.message || "An error occurred" });
    }

    // Send the response data back to the client
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
}
