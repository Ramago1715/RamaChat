

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Login
 */
@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public Login() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String mail = request.getParameter("mail");
		String pass = request.getParameter("pass");
		
		User u = new User();
		u.setMail(mail);
		u.setPass(pass);
		u.setUser("rama");
		
		u.login();
		ConnectionDB conBD = new ConnectionDB();
		conBD.connectar();
		boolean res = conBD.buscarcorreoycontra(mail,pass);
		
		if (res) {
			response.getWriter().write(u.getSession());
		}else {
			response.getWriter().write("false");
		}
	}
	/*protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String mail = request.getParameter("mail");
		String session = request.getParameter("session");
		User u = new User();
		u.setMail(mail);
		u.setSession(session);
		boolean respuesta =  u.isLogged();
		if(respuesta) {
			response.getWriter().write("true");
			}else {
				response.getWriter().write("false");
			}
		
		
		
	}
	*/
}
