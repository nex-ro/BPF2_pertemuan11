import Pagination from "@/Components/pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constant";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import React, { useEffect } from "react";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

export default function Index({ auth, projects, queryParams = null, Success }) {
    queryParams = queryParams || {};
    console.log(projects);
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("project.index"), queryParams);
    };

    useEffect(() => {
        console.log("Success prop:", Success);
    }, [Success]); // Log only when 'success' prop changes

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const sortChange = (name) => {
        if (name === queryParams.sort_field) {
            queryParams.sort_direction =
                queryParams.sort_direction === "asc" ? "desc" : "asc";
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("project.index"), queryParams);
    };
    const deleteProject = (project) => {
        if (!window.confirm("Are you sure you want to delete the project?")) {
          console.log(project);
            return ;
        }
        router.delete(route("project.destroy", project.id));
      }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Projects
                    </h2>
                    <Link
                        href={route("project.create")} // Replace `route` with your routing function/method
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {Success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {Success}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl-text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <TableHeading
                                            name="id"
                                            sortField={queryParams.sort_field}
                                            sortDirection={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChange}
                                        >
                                            ID
                                        </TableHeading>
                                        <th className="px-3 py-2">Image</th>
                                        <TableHeading
                                            name="name"
                                            sortField={queryParams.sort_field}
                                            sortDirection={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChange}
                                        >
                                            name
                                        </TableHeading>
                                        <TableHeading
                                            name="status"
                                            sortField={queryParams.sort_field}
                                            sortDirection={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChange}
                                        >
                                            Status
                                        </TableHeading>
                                        <TableHeading
                                            name="create_at"
                                            sortField={queryParams.sort_field}
                                            sortDirection={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChange}
                                        >
                                            Create_at
                                        </TableHeading>
                                        <TableHeading
                                            name="due_date"
                                            sortField={queryParams.sort_field}
                                            sortDirection={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChange}
                                        >
                                            Due_Date
                                        </TableHeading>
                                        <th className="px-3 py-2">
                                            Created By
                                        </th>
                                        <th className="px-3 py-2 text-right">
                                            Action
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">
                                            <TextInput
                                                className="w-full"
                                                defaultValue={queryParams.name}
                                                onBlur={(e) =>
                                                    searchFieldChanged(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                onKeyPress={(e) =>
                                                    onKeyPress("name", e)
                                                }
                                            />
                                        </th>
                                        <th className="px-3 py-3">
                                            <SelectInput
                                                className="w-full"
                                                defaultValue={
                                                    queryParams.status
                                                }
                                                onChange={(e) =>
                                                    searchFieldChanged(
                                                        "status",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Select Status
                                                </option>
                                                <option value="pending">
                                                    Pending
                                                </option>
                                                <option value="in_progress">
                                                    In Progress
                                                </option>
                                                <option value="completed">
                                                    Completed
                                                </option>
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map((project) => (
                                        <tr
                                            key={project.id}
                                            className="bg-white border-b dark:bg-gray-300 dark:border-gray-700"
                                        >
                                            <td className="px-3 py-2">
                                                {project.id}
                                            </td>
                                            <td className="px-3 py-2">
                                                <img
                                                    src={project.image_path}
                                                    style={{ width: "60px" }}
                                                />
                                            </td>
                                            <td className="px-3 py-2 text-black-100 text-nowrap hover:underline">
                                                <Link
                                                    href={route(
                                                        "project.show",
                                                        project.id
                                                    )}
                                                >
                                                    {project.name}
                                                </Link>
                                            </td>
                                            <td className="px-3 py-2">
                                                <span
                                                    className={`px-2 py-1 rounded text-white ${
                                                        PROJECT_STATUS_CLASS_MAP[
                                                            project.status
                                                        ]
                                                    }`}
                                                >
                                                    {
                                                        PROJECT_STATUS_TEXT_MAP[
                                                            project.status
                                                        ]
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                {project.createdBy["id"]}
                                            </td>
                                            <td className="px-3 py-2">
                                                {project.due_date}
                                            </td>
                                            <td className="px-3 py-2">
                                                {project.create_at}
                                            </td>
                                            <td className="px-3 py-2 text-right">
                                                <Link
                                                    href={route(
                                                        "project.edit",
                                                        project.id
                                                    )}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={(e) =>
                                                        deleteProject(project)
                                                    }
                                                    className="font-medium text-blue-600 dark:text-red-500 hover:underline mx-1"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}