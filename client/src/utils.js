/**
 * Function that takes path and returns last folder/file, and rest of the path
 * @param {string?} path - given path to trim
 * @returns {Object} object that contains last file/folder and rest of the path
 * @returns {Object.last} last folder/file in path
 * @returns {Object.path} rest of the path
 */
export function trimToLastFolder(path) {
    if (path == null || path === "")
        return {last: "", path: ""};

    // If the '/' is the last character remove it
    if (path.at(path.length - 1) === '/')
        path = path.substring(0, path.length - 1)

    let lastSlashIndex = path.lastIndexOf('/');

    // If there is no '/' in path return the full path
    // because entire path is the folder/file name
    if (lastSlashIndex == -1) return {last: path, path: ""};

    return {
        last: path.substring(lastSlashIndex + 1),
        path: path.substring(0, lastSlashIndex + 1)
    };
}
