import sqlalchemy


class DBInspector:
    def __init__(self, db_url):
        self.engine = sqlalchemy.create_engine(db_url)

    def get_table_names(self):
        inspector = sqlalchemy.inspect(self.engine)
        return inspector.get_table_names()

    def execute_query(self, query):
        with self.engine.connect() as connection:
            result = connection.execute(sqlalchemy.text(query))
            headers = [col.name for col in result.cursor.description]
            rows = []
            for row in result:
                rows.append(list(row))
            return {"headers": headers, "rows": rows}

    def get_table_columns(self, table_name):
        inspector = sqlalchemy.inspect(self.engine)
        return inspector.get_columns(table_name)


# Usage example
if __name__ == "__main__":
    inspector = DBInspector(
        "postgresql://postgres:example@143.47.186.111:5432/postgres"
    )
    columns = inspector.get_table_columns("ad_metrics")
    for col in columns:
        print(col["name"], col["type"])

    tables = inspector.get_table_names()

    print(tables)

    for row in inspector.execute_query("SELECT * FROM public.ad_metrics"):
        print(row)
