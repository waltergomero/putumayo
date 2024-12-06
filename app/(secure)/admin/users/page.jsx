import Search from '@/components/ui/search';
import Table from '@/components/users/table';
import { CreateUserBtn } from '@/components/users/buttons';
import Pagination from '@/components/ui/pagination';
import { fetchUserPages } from '@/actions/user-actions';
import { Suspense } from 'react';


export const metadata = {  title: 'Users',};

export default async function UserPage({ searchParams,}) {
 //console.log("searchParams", searchParams);
  const {query} = await searchParams?.query || '';

  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchUserPages(query);
  console.log("totalPages", totalPages);

  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-2">
        <Search placeholder="Search users..."/>
        <CreateUserBtn />
      </div>
      <Suspense key={query + currentPage} >
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} /> 
      </div> */}
    </div>
  );
}