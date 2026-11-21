import React from "react";

export function Table({ className = "", ...props }) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        className={`w-full caption-bottom text-sm text-left text-slate-700 ${className}`}
        {...props}
      />
    </div>
  );
}

export function TableHeader({ className = "", ...props }) {
  return <thead className={`border-b border-slate-200 bg-slate-50/75 ${className}`} {...props} />;
}

export function TableBody({ className = "", ...props }) {
  return (
    <tbody
      className={`divide-y divide-slate-200 bg-white ${className}`}
      {...props}
    />
  );
}

export function TableFooter({ className = "", ...props }) {
  return (
    <tfoot
      className={`border-t border-slate-200 bg-slate-50 font-medium text-slate-700 ${className}`}
      {...props}
    />
  );
}

export function TableRow({ className = "", ...props }) {
  return (
    <tr
      className={`transition-colors hover:bg-slate-50/80 data-[state=selected]:bg-slate-100 ${className}`}
      {...props}
    />
  );
}

export function TableHead({ className = "", ...props }) {
  return (
    <th
      className={`h-11 px-4 text-left align-middle font-semibold text-slate-600 [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  );
}

export function TableCell({ className = "", ...props }) {
  return (
    <td
      className={`p-4 align-middle text-slate-700 [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    />
  );
}

export function TableCaption({ className = "", ...props }) {
  return (
    <caption
      className={`mt-4 text-sm text-slate-500 ${className}`}
      {...props}
    />
  );
}
