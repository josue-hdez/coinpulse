"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Field, FieldLabel } from "./ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "./ui/select";

const RowsPerPageSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (perPage: string) =>
    router.push(`/?page=${searchParams.get("page") || 1}&perPage=${perPage}`);

  return (
    <Field className="w-fit z-45" orientation="horizontal">
      <FieldLabel className="hidden md:block" htmlFor="select-rows-per-page">
        Rows
      </FieldLabel>
      <Select
        value={searchParams.get("perPage") || "25"}
        onValueChange={handlePageChange}
      >
        <SelectTrigger id="select-rows-per-page" className="w-18">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="start">
          <SelectGroup>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
};

export default RowsPerPageSelect;
