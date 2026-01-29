from flask import Flask, jsonify
from prometheus_client import make_wsgi_app
from werkzeug.middleware.dispatcher import DispatcherMiddleware
import time

app = Flask(__name__)

# Add prometheus wsgi middleware to route /metrics requests
app.wsgi_app = DispatcherMiddleware(app.wsgi_app, {
    '/metrics': make_wsgi_app()
})

@app.route('/api/data')
def get_data():
    return jsonify({"message": "  Hello from Backend!", "timestamp": time.time()})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
