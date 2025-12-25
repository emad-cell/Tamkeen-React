import { Label } from "./ui/label";

const InfoField = ({ label, value }) => (
  <div className="space-y-1">
    <Label>{label}</Label>
    <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 text-sm">
      {value}
    </div>
  </div>
);
export default InfoField;
