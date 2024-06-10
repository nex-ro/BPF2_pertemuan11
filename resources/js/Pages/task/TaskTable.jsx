import Pagination from "@/Components/pagination";
import { Head, Link, router } from "@inertiajs/react";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constant";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

export default function TaskTable({ auth, projects, queryParams = null }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("task.index"), queryParams);
    };

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
        router.get(route("task.index"), queryParams);
    };
    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl-text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <TableHeading
                                name="id"
                                sortField={queryParams.sort_field}
                                sortDirection={queryParams.sort_direction}
                                sortChanged={sortChange}
                            >
                                ID
                            </TableHeading>
                            <th className="px-3 py-2">Image</th>
                            <TableHeading
                                name="name"
                                sortField={queryParams.sort_field}
                                sortDirection={queryParams.sort_direction}
                                sortChanged={sortChange}
                            >
                                name
                            </TableHeading>
                            <TableHeading
                                name="status"
                                sortField={queryParams.sort_field}
                                sortDirection={queryParams.sort_direction}
                                sortChanged={sortChange}
                            >
                                Status
                            </TableHeading>
                            <TableHeading
                                name="create_at"
                                sortField={queryParams.sort_field}
                                sortDirection={queryParams.sort_direction}
                                sortChanged={sortChange}
                            >
                                Create_at
                            </TableHeading>
                            <TableHeading
                                name="due_date"
                                sortField={queryParams.sort_field}
                                sortDirection={queryParams.sort_direction}
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
                                        alt={project.name}
                                    />
                                </td>
                                <td className="px-3 py-2">
                                    {project.name}
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
                                            "task.edit",
                                            project.id
                                        )}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={route(
                                            "task.destroy",
                                            project.id
                                        )}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                    >
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={projects.meta.links} />
        </>
    );

}
