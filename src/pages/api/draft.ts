import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const draftsFilePath = path.join(process.cwd(), "data", "drafts.json");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === "POST") {
    try {
      const { content } = req.body;
      let drafts = JSON.parse(fs.readFileSync(draftsFilePath, "utf8"));
      drafts.push({ content });
      fs.writeFileSync(draftsFilePath, JSON.stringify(drafts, null, 2));
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Failed to save draft" });
    }
  } else if (method === "GET") {
    try {
      const drafts = JSON.parse(fs.readFileSync(draftsFilePath, "utf8"));
      res.json({ drafts });
    } catch (err) {
      res.status(500).json({ error: "Failed to read drafts" });
    }
  }
  return res.status(500).json({ error: "invalid request" });
}
