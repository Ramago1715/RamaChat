import java.io.IOException;
import java.util.concurrent.TimeUnit;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Xat
 */
@WebServlet("/Xat")
public class Xat extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public Xat() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String mail = request.getParameter("mail");
        String session = request.getParameter("session");

        User u = new User();
        u.setMail(mail);
        u.setSession(session);

        Missatge sms=null;
        if (u.isLogged()) {
            sms = new Missatge();
            sms.setReceptor(mail);
            sms.getMissatge();
            
        }
        if (sms != null && sms.getId()!= 0) {
        	try {
                JSONObject json = new JSONObject();
                String mensaje = sms.getText();
                String emisor = sms.getEmisor();
                json.put("sms",mensaje);
                json.put("emisor",emisor);
                JSONArray JSON = new JSONArray(); 
                JSON.put(json);
                response.getWriter().append(JSON.toString());
            } catch (JSONException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        } else {
            response.getWriter().append("null");
        }
    }
		
		
		
		
		
	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String mail = request.getParameter("mail");
		String session = request.getParameter("session");
		String receptor = request.getParameter("receptor");
		String text = request.getParameter("sms");
		
		User u = new User();
		u.setMail(mail);
		u.setSession(session);
		
		Missatge sms = null;
		if (u.isLogged()) {
			sms = new Missatge();
			sms.setReceptor(receptor);
			sms.setText(text);
			sms.setEmisor(mail);
			sms.guardar();
		}
	}
}