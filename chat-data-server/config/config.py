import os
import yaml

config_basedir = os.getcwd() + '/config/'
with open(f'{config_basedir}config.yaml') as f:
    data = yaml.load(f, Loader=yaml.FullLoader)
    AZURE_OPENAI_API_KEY = data.get('AZURE_OPENAI').get('AZURE_OPENAI_API_KEY') 
    OPENAI_API_VERSION= data.get('AZURE_OPENAI').get('OPENAI_API_VERSION')
    AZURE_DEPLOYMENT=data.get('AZURE_OPENAI').get('AZURE_DEPLOYMENT')
    AZURE_OPENAI_ENDPOINT=data.get('AZURE_OPENAI').get('AZURE_OPENAI_ENDPOINT')