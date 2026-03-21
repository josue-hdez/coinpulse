"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { buildPageNumbers } from "@/lib/utils";
import { ELLIPSIS } from "@/lib/constants";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "./ui/pagination";

const PaginationControls = ({
  currentPage,
  totalPages,
  hasMorePages,
}: {
  currentPage: number;
  totalPages: number;
  hasMorePages: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageNumbers = buildPageNumbers(currentPage, totalPages);
  const isLastPage = !hasMorePages || currentPage === totalPages;

  const handlePageChange = (page: number) =>
    router.push(`/?page=${page}&perPage=${searchParams.get("perPage") || 25}`);

  return (
    <Pagination className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="sm:mr-3"
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          />
        </PaginationItem>
        {pageNumbers.map((page, index) => (
          <PaginationItem key={index} className="hidden sm:block">
            {page === ELLIPSIS ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={`/?page=${page}&perPage=${searchParams.get("perPage") || 25}`}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className="sm:ml-3"
            onClick={() => !isLastPage && handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
