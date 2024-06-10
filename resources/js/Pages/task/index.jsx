import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TaskTable from "./TaskTable";


export default function Index({ auth, tasks, queryParams = null }) {
  return (
     <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-grey-800">
                    task
                </h2>
            }
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
              <TaskTable projects={tasks} queryParams={queryParams} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
