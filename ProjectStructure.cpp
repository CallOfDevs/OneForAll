#include <iostream>
#include <filesystem>
#include <string>
#include <vector>
#include <algorithm>

void printTree(const std::filesystem::path& p, std::string indent = "") {
    if(!exists(p)) {
        std::cout << indent << "Path does not exist: " << p << std::endl;
        return;
    }
    std::vector<std::filesystem::path> files = {};
    for(const auto& entry : std::filesystem::directory_iterator(p)) {
            files.push_back(entry.path());
    }
    sort(files.begin(), files.end());

    for(const auto& file : files) {
        std::string path = file.string();
        bool is_last = (&file == &files.back());
        std::string pointer = "|-- ";
        std::cout << indent << pointer << file.filename().string() << std::endl;
        if(is_directory(file)) {
            std::string new_indent = indent + (is_last ? "    " : "|   ");
            printTree(file, new_indent);
        }
    }

}

int main() {
    const std::string path = "D:/Programs/.vscode/";
    std::cout << "Project Structure for: " << path << std::endl;
    printTree(path);
    std::cout << std::endl;
    return 0;
}