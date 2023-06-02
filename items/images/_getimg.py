import requests
from bs4 import BeautifulSoup
import urllib.request
import sys

item = sys.argv[1]

url = f"https://id5.fandom.com/wiki/{item}"

response = requests.get(url)

if response.status_code == 200:
    page_content = response.content

    soup = BeautifulSoup(page_content, 'html.parser')

    figure_tag = soup.find('figure', {'class': 'pi-item pi-image'})

    img_tag = figure_tag.find('img')

    img_url = img_tag.get('src')

    urllib.request.urlretrieve(img_url, f"{item}.png")
