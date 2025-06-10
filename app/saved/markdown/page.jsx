"use client";

import { deleteMarkdown, getMdList } from "@/actions/saveState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import {
  FaTrashAlt,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa";
import { toast } from "sonner";
import { debounce } from "lodash";
import { LuLoaderCircle } from "react-icons/lu";

const MarkdownPage = () => {
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [markdowns, setMarkdowns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const inputRef = useRef(null);

  const PAGE_LIMIT = 10;

  useEffect(() => {
    const fetchMarkdowns = async () => {
      const response = await getMdList();
      if (response.success) {
        setMarkdowns(response.data);
      } else {
        toast.error("Error fetching markdowns. Try again later.");
      }
      setLoading(false);
    };
    fetchMarkdowns();
  }, []);

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearch(searchName);
      setCurrentPage(1);
    }, 300);
    handler();

    return () => handler.cancel();
  }, [searchName]);

  const filteredMarkdowns = markdowns.filter((md) =>
    md.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMarkdowns.length / PAGE_LIMIT);
  const paginatedMarkdowns = filteredMarkdowns.slice(
    (currentPage - 1) * PAGE_LIMIT,
    currentPage * PAGE_LIMIT
  );

  const handleDelete = async (id) => {
    const response = await deleteMarkdown(id);
    if (response.success) {
      toast.success("Markdown deleted successfully.");
      setMarkdowns(markdowns.filter((md) => md.id !== id));
    } else {
      toast.error("Error deleting markdown. Try again later.");
      console.log(response.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-full w-full pt-10 px-20 gap-5 text-cream">
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight lg:pb-3">
        Saved{" "}
        <span className="text-accent">
          M<u>arkdowns</u>
        </span>
      </h2>
      {/* Search */}
      <div className="flex justify-between w-full items-center border rounded-lg px-2">
        <Input
          ref={inputRef}
          className="w-full border-0 focus:outline-none focus:ring-0 focus-visible:ring-0 shadow-none"
          type="text"
          placeholder="Search using name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <GoSearch
          className="text-2xl text-cream cursor-text"
          onClick={() => inputRef.current.focus()}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-20rem)] w-full">
          <LuLoaderCircle className="animate-spin mx-auto" size={35} />
        </div>
      ) : (
        <>
          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-dusk">
                <TableHead className="text-cream text-center">Name</TableHead>
                <TableHead className="text-cream text-center">
                  Last Modified
                </TableHead>
                <TableHead className="text-cream text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedMarkdowns.length > 0 ? (
                paginatedMarkdowns.map((md) => (
                  <TableRow key={md.id} className="hover:bg-gray-900">
                    <TableCell className="text-center">
                      <Link
                        href={`/markdown?id=${md.id}`}
                        className="text-accent"
                      >
                        {md.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      {new Date(md.updatedAt).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        className="hover:bg-gray-900 text-red-500 hover:text-red-600"
                        size="icon"
                        onClick={() => handleDelete(md.id)}
                      >
                        <FaTrashAlt />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No markdowns found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {filteredMarkdowns.length > 0 && (
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
              >
                <FaLongArrowAltLeft />
              </Button>
              <span className="text-cream">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
              >
                <FaLongArrowAltRight />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MarkdownPage;
