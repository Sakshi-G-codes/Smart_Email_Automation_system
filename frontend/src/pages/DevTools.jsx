import ApiStatus from "../components/APIStatus";
import ApiStatusExtended from "../components/APIStatus_extended";

export default function DevTools() {
  return (
    <div>
      <ApiStatus />
      <ApiStatusExtended />
    </div>
  );
}
