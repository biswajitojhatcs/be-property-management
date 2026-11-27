import path from "path";
import os from "os";

const uploadDir = path.join(
  os.homedir(),
  "Documents",
  "property-management-uploads",
);

export default uploadDir;
