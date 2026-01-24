import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";
import { config } from "./config/env.js";

const app = createApp();

await connectDB();

app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
});
