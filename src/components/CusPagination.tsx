"use client";

import { Pagination, TablePagination } from "@mui/material";

import { type PageSetting } from "@/types/app/table";

const CusPagination = ({
  pageSetting,
  setPageSetting
}: {
  pageSetting: PageSetting;
  setPageSetting: (pageSetting: PageSetting) => void;
}) => {
  return (
    <TablePagination
      rowsPerPageOptions={[20, 50, 100]}
      component="div"
      count={pageSetting.total_elements}
      page={pageSetting.page}
      onRowsPerPageChange={(e) => {
        setPageSetting({
          ...pageSetting,
          size: Number(e.target.value)
        });
      }}
      onPageChange={() => {}}
      labelRowsPerPage="每頁筆數"
      labelDisplayedRows={() => {
        return (
          <span>{`${pageSetting.page * pageSetting.size + 1} - ${
            pageSetting.page * pageSetting.size + pageSetting.size
          } 共 ${pageSetting.total_elements} 筆`}</span>
        );
      }}
      rowsPerPage={pageSetting.size}
      ActionsComponent={() => {
        return (
          <Pagination
            sx={{ "& ul": { flexWrap: "nowrap" } }}
            count={pageSetting.total_pages}
            page={pageSetting.page + 1}
            onChange={(_, page) => {
              setPageSetting({
                ...pageSetting,
                page: page - 1
              });
            }}
          />
        );
      }}
    />
  );
};

export default CusPagination;
