import os
import json
import signal
from flask import Flask, send_from_directory, render_template_string

app = Flask(__name__)

@app.route('/')
@app.route('/<path:filename>')
def serve_files(filename=''):
    directory = os.getcwd()  # Get the current working directory
    if filename == 'stop':
        os.kill(os.getpid(), signal.SIGINT)
        return json.jsonify({ "success": True, "message": "Server is shutting down..." })

    if filename == '' or os.path.isdir(os.path.join(directory, filename)):
        files = os.listdir(os.path.join(directory, filename))
        files_links = [f'<li><a href="http://127.0.0.1:5500/{filename}/{f}">{f}</a></li>' for f in files]
        return render_template_string(f"""
            <h1>Directory Listing</h1>
            <ul>
                {''.join(files_links)}
            </ul>
        """)

    return send_from_directory(directory, filename)
def stopServer():
    os.kill(os.getpid(), signal.SIGINT)
    return json.jsonify({ "success": True, "message": "Server is shutting down..." })

if __name__ == '__main__':
    app.run(debug=True,port=5500 )