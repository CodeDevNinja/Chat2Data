from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
import os
from langchain_openai import AzureChatOpenAI

from config.config import (
    AZURE_DEPLOYMENT,
    AZURE_OPENAI_API_KEY,
    OPENAI_API_VERSION,
    AZURE_OPENAI_ENDPOINT,
)
os.environ["AZURE_OPENAI_API_KEY"] = AZURE_OPENAI_API_KEY
os.environ["AZURE_OPENAI_ENDPOINT"] = AZURE_OPENAI_ENDPOINT

model = AzureChatOpenAI(
    openai_api_version=OPENAI_API_VERSION,
    azure_deployment=AZURE_DEPLOYMENT,
)
from langchain_community.utilities import SQLDatabase

db = SQLDatabase.from_uri("postgresql://postgres:example@143.47.186.111:5432/postgres")

from langchain_core.prompts import ChatPromptTemplate

template = """Based on the table schema below, write a SQL query that would answer the user's question:
{schema}

Question: {question}
SQL Query:"""
prompt = ChatPromptTemplate.from_template(template)


def get_schema(_):
    return db.get_table_info()


def run_query(query):
    return db.run(query)


sql_response = (
    RunnablePassthrough.assign(schema=get_schema)
    | prompt
    | model.bind(stop=["\nSQLResult:"])
    | StrOutputParser()
)
from langchain.chains.sql_database.query import create_sql_query_chain


def text2sql(text):
    chain = create_sql_query_chain(model, db)
    return chain.invoke({"question": text})
