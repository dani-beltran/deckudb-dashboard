import './TablePagination.css'

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

interface TablePaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

function TablePagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: TablePaginationProps) {
  const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const rangeEnd = Math.min(currentPage * pageSize, totalItems)

  return (
    <div className="job-table-footer">
      <p className="job-table-count">
        Showing {rangeStart}–{rangeEnd} of {totalItems} job{totalItems !== 1 ? 's' : ''}
      </p>

      <div className="pagination-controls">
        <button
          type="button"
          className="page-btn"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          title="First page"
        >
          «
        </button>
        <button
          type="button"
          className="page-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          title="Previous page"
        >
          ‹
        </button>

        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          className="page-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          title="Next page"
        >
          ›
        </button>
        <button
          type="button"
          className="page-btn"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          title="Last page"
        >
          »
        </button>

        <select
          className="page-size-select"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          title="Rows per page"
        >
          {PAGE_SIZE_OPTIONS.map((n) => (
            <option key={n} value={n}>{n} / page</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default TablePagination
