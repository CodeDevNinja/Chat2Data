"use client"
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import Toolbar from "@/components/explorer/toolbar"
import ReactECharts from 'echarts-for-react';

import { useEffect, useState, useRef } from 'react';

import getAnalysticDataByLang from '@/app/api/query'
import Sidebar from '@/components/layout/sidebar'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { CodeBlock, dracula, github } from "react-code-blocks";
import { tuple } from 'react-code-blocks/dist/utils/prop-types'


export default function Home() {
  interface TableData {
    headers: string[];
    rows: string[][];
    sql: string;
  }
  const [disTabOrChart, setDisTabOrChart] = useState(false)
  const [disData, setDisData] = useState(true)
  const [sql, setSQL] = useState("")

  const tableData: TableData = {
    headers: [],
    rows: [[]],
    sql: ''
  };
  const [datas, setDatas] = useState(tableData)

  const [naturalLang, setNaturalLang] = useState('')
  const [loading, setLoading] = useState(false)

  async function loadDatas(currentPage: number) {
    if (loading) return
    try {
      setLoading(true)
      const { data } = await getAnalysticDataByLang({ "natural_lang": naturalLang });
      setDatas(data)
      setSQL(data.sql)
      setDisData(false)
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setLoading(false)
    }
  }

  const getOption = (): any => {
    let option = {}
    if (chartType == "lineChart") {
      option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Impressions', 'Clicks', 'Conversions', 'Cost']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2022-02-04', '2022-02-04', '2022-04-04', '2022-04-04', '2022-06-04', '2022-06-04', '2022-08-04', '2022-08-04', '2022-12-04', '2022-12-04']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Impressions',
            type: 'line',
            stack: 'Total',
            data: [1500, 1200, 1000, 800, 2500, 2000, 1800, 1500, 1200, 1000]
          },
          {
            name: 'Clicks',
            type: 'line',
            stack: 'Total',
            data: [300, 250, 200, 150, 500, 400, 360, 300, 240, 200]
          },
          {
            name: 'Conversions',
            type: 'line',
            stack: 'Total',
            data: [20, 15, 10, 5, 50, 30, 25, 20, 15, 10]
          },
          {
            name: 'Cost',
            type: 'line',
            stack: 'Total',
            data: [45.0, 35.0, 15.0, 10.0, 100.0, 80.0, 75.0, 60.0, 45.0, 40.0]
          }
        ]
      }
    }
    else if (chartType == "areaChart") {
      option = {
        title: {
          text: 'Stacked Area Chart'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    }
    else if (chartType == "pieChart") {
      option = {
        // title: { text: "Referer of a Website", subtext: "Fake Data", left: "center" },
        tooltip: { trigger: "item" },
        legend: { orient: "vertical", left: "left" },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              }
            },
          }
        ],
      }
    }
    return option
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      console.log('Enter key pressed');
      loadDatas(1)
    }
  }

  const handleInputChange = (e: any) => {
    setNaturalLang(e.target.value)
  }
  const [chartType, setChartType] = useState('')

  const handleIconClick = (icon: any) => {
    console.log(`Icon clicked in parent: ${icon}`);
    if (icon == "sheet") {
      setDisTabOrChart(false)
    } else {
      setDisTabOrChart(true)
    }
    setChartType(icon)
    // Additional logic based on the clicked icon can go here
  };

  // render echarts option.
  return (
    <div className='grid grid-cols-10'>
      {/* <Sidebar className='col-span-1'></Sidebar> */}
      <div className="flex min-h-screen flex-col items-center  p-14 bg-slate-50 col-span-10">
        {/* <MyComponent></MyComponent> */}
        <Input className="w-[96vw] md:w-[80vw] lg:w-[60vw] my-2  border-blue-200"
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
        />
        {loading ?
          <div
            className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
          </div>
          :
          <div>
            <Card className="w-[96vw] md:w-[80vw] lg:w-[60vw] my-1 h-60vh">
              {/* <CardHeader>
              <CardTitle>数据探索</CardTitle>
              <CardDescription>AI 数据分析探索</CardDescription>
            </CardHeader> */}
              <CardContent className='max-h-60vh'>
                {disTabOrChart ?
                  <div >
                    <ReactECharts notMerge={true}
                      lazyUpdate={true} option={getOption()} style={{ height: '60vh', width: '100%' }} />
                  </div>
                  : <Table className='h-60vh'>
                    <TableCaption className="items-right">
                      {/* <Toolbar /> */}
                      {/* A list of your recent invoices. */}
                      {/* <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>
                            2
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination> */}
                    </TableCaption>
                    <TableHeader >
                      <TableRow>
                        {datas.headers.map((header, index) => (
                          <TableHead key={index}>{header}</TableHead>
                        ))}
                        {/* <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead> */}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {datas.rows.map((cells, index) => (
                        <TableRow key={index}>
                          {cells.map((cell, index) => (
                            // <ScrollArea className="rounded-md border">
                            <TableCell key={index} className="font-medium">{cell}</TableCell>
                            // </ScrollArea>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                    {/* <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow> */}
                    {/* <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow><TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow> */}
                  </Table>}
              </CardContent>
              <CardFooter className="flex  flex-col items-center  ">
                <Toolbar onIconClick={handleIconClick} />
                {/* @copyright */}
                {/* <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button> */}
              </CardFooter>
              <CodeBlock
                text={sql}
                language="sql"
                showLineNumbers={true}
                // startingLineNumber={true}
                theme={github}
              />
            </Card>
          </div>}
      </div>
    </div>

  )
}
