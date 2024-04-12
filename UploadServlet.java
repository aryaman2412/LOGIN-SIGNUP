import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;


@WebServlet(name = "UploadServlet", urlPatterns = {"/home"})
@MultipartConfig
public class UploadServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Retrieve the uploaded file
        Part filePart = request.getPart("file"); // Assumes the file input field in the form has name="file"
        String fileName = filePart.getSubmittedFileName();
        InputStream fileContent = filePart.getInputStream();

        // Define the path where you want to store the uploaded files on your server
        String uploadPath = "C:/uploads/"; // Replace with your desired upload directory
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs(); // Create the directory if it doesn't exist
        }

        // Construct the absolute file path for the uploaded file on the server
        String filePath = uploadPath + fileName;
        File targetFile = new File(filePath);

        // Copy the uploaded file content to the server
        try (OutputStream out = new FileOutputStream(targetFile)) {
            int bytesRead;
            final byte[] buffer = new byte[8192];
            while ((bytesRead = fileContent.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }
        }

        // Send response back to the client
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("File uploaded successfully: " + fileName);
    }
}
