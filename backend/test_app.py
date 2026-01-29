import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_metrics_endpoint(client):
    """Test if Prometheus metrics endpoint is accessible."""
    response = client.get('/metrics')
    assert response.status_code == 200
    assert b'# HELP' in response.data

def test_api_data_endpoint(client):
    """Test the API data endpoint."""
    response = client.get('/api/data')
    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data['message'] == "Hello from Backend!"
    assert 'timestamp' in json_data
