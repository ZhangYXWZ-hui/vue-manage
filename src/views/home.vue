<template>
    <div id="home">
        <div class="flexed">
            <el-card class="todoList">
                <h4 class="modelTitle">公告</h4>
                <el-timeline>
                    <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index"
                    :timestamp="activity.timestamp">
                    {{activity.content}}
                    </el-timeline-item>
                </el-timeline>
            </el-card>
            <el-card class="calendar">
                <h4 class="modelTitle">日历</h4>
                <el-calendar v-model="value" :first-day-of-week= '7'>
                    <template slot="dateCell" slot-scope="{date, data}">
                        <div>
                            <div class="solar">{{ data.day.split('-')[2] }}</div>
                            <div class="lunar" :class="{ festival : isFestival(date, data) }">{{ solarToLunar(date, data) }}</div>
                        </div>
                    </template>
                </el-calendar>
            </el-card>
        </div>
        <div class="charts">
            <el-row :gutter="20">
                <el-col :span='12' style="height:500px;margin-bottom:20px">
                    <el-card id="echart1"></el-card>
                </el-col>
                <el-col :span='12' style="height:500px;margin-bottom:20px">
                    <el-card id="echart2"></el-card>
                </el-col>
                <el-col :span='12' style="height:500px;margin-bottom:20px">
                    <el-card id="echart3"></el-card>
                </el-col>
                <el-col :span='12' style="height:500px;margin-bottom:20px">
                    <el-card id="echart4"></el-card>
                </el-col>
            </el-row>
            
        </div>
    </div>
</template>
<style lang="less">
    .todoList{
        width: 400px;
        height: 720px;
        .el-timeline{
            height: 625px;
            overflow-y: auto;
        }
        .el-timeline::-webkit-scrollbar{
            display: none;
        }
    }
    .calendar{
        width: calc(100% - 420px);
    }
    .modelTitle{
        padding-bottom: 20px;
    }
    .charts{
        margin-top: 20px;
        .el-card{
            height: 100%;
            padding: 15px;
            box-sizing: border-box;
        }
    }
</style>
<script>
import calendar from '../assets/js/calendar'
export default {
    name: "home",
    data(){
        return{
            value:new Date(),
            activities: [
                {
                    content: '活动按期开始',
                    timestamp: '2018-04-15'
                }, 
                {
                    content: '通过审核',
                    timestamp: '2018-04-13'
                }, 
                {
                    content: '创建成功',
                    timestamp: '2018-04-11'
                },
                {
                    content: '活动按期开始',
                    timestamp: '2018-04-15'
                }, 
                {
                    content: '通过审核',
                    timestamp: '2018-04-13'
                }, 
                {
                    content: '创建成功',
                    timestamp: '2018-04-11'
                },
                {
                    content: '活动按期开始',
                    timestamp: '2018-04-15'
                }, 
                {
                    content: '通过审核',
                    timestamp: '2018-04-13'
                }, 
                {
                    content: '创建成功',
                    timestamp: '2018-04-11'
                },
                {
                    content: '活动按期开始',
                    timestamp: '2018-04-15'
                }, 
                {
                    content: '通过审核',
                    timestamp: '2018-04-13'
                }, 
                {
                    content: '创建成功',
                    timestamp: '2018-04-11'
                }
            ],
            color:'brown'
        }
    },
    methods: {
        drawEchart1() {
            let myChart = this.$echarts.init(document.getElementById("echart1"));
            // 指定图表的配置项和数据
            let option = {
                title: {
                    text: "网站访问量分布统计",
                    left:'center'
                },
                color:this.color,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ["访问量"],
                    left:'left'
                },
                xAxis: {
                    data: ["2020-06","2020-07", "2020-08", "2020-09", "2020-10", "2020-11", "2020-12"],
                },
                yAxis: {},
                series: [
                    {
                        name: "访问量",
                        type: "bar",
                        barWidth:30,
                        data: [1,5, 20, 36, 10, 10, 20],
                    }
                ],
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener('resize',()=>{
                myChart.resize()
            })
        },
        drawEchart2() {
            let myChart = this.$echarts.init(document.getElementById("echart2"));

            let option = {
                title: {
                    text: "文章阅读量",
                    left:'center'
                },
                color:this.color,
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: 'shadow'
                    },
                },
                legend:{
                    data: ["阅读量"],
                    left:'left'
                },
                xAxis:{
                    data:['html/css','javascript','vue/react','后端技术','前端插件','文章分享']
                },
                yAxis:{},
                series: [
                    {
                        name:'阅读量',
                        type:'bar',
                        barWidth:30,
                        data: [5, 20, 36, 10, 10, 20],
                    }
                ],
                
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener('resize',()=>{
                myChart.resize()
            })
        },
        drawEchart3(){
            let myChart = this.$echarts.init(document.getElementById("echart3"));

            let option = {
                title: {
                    text: '网站文章比例',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['html/css', 'javascript', 'vue/react', '后端技术', '前端插件','文章分享']
                },
                series: [
                    {
                        name: '文章比例',
                        type: 'pie',
                        radius: [0,'70%'],
                        center: ['50%', '55%'],
                        data: [
                            {value: 35, name: 'html/css'},
                            {value: 17, name: 'javascript'},
                            {value: 26, name: 'vue/react'},
                            {value: 5, name: '后端技术'},
                            {value: 10, name: '前端插件'},
                            {value: 20, name: '文章分享'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
            window.addEventListener('resize',()=>{
                myChart.resize()
            })
        },
        // 是否选中日期
        // isSelected : function(slotDate, slotData) {
        //     return this.selectedDates.includes(slotData.day)
        // },
        // 是否节假日
        isFestival(slotDate, slotData) {
            let solarDayArr = slotData.day.split('-');
            let lunarDay = calendar.solar2lunar(solarDayArr[0], solarDayArr[1], solarDayArr[2])

            // 公历节日\农历节日\农历节气
            let festAndTerm = [];
            festAndTerm.push(lunarDay.festival == null ? '' : ' ' + lunarDay.festival)
            festAndTerm.push(lunarDay.lunarFestival == null ? '' : '' + lunarDay.lunarFestival)
            festAndTerm.push(lunarDay.Term == null ? '' : '' + lunarDay.Term)
            festAndTerm = festAndTerm.join('')

            return festAndTerm != ''
        },
        // 公历转农历
        solarToLunar(slotDate, slotData) {
            let solarDayArr = slotData.day.split('-');
            let lunarDay = calendar.solar2lunar(solarDayArr[0], solarDayArr[1], solarDayArr[2])

            // 农历日期
            let lunarMD = lunarDay.IMonthCn + lunarDay.IDayCn

            // 公历节日\农历节日\农历节气
            let festAndTerm = [];
            festAndTerm.push(lunarDay.festival == null ? '' : ' ' + lunarDay.festival)
            festAndTerm.push(lunarDay.lunarFestival == null ? '' : '' + lunarDay.lunarFestival)
            festAndTerm.push(lunarDay.Term == null ? '' : '' + lunarDay.Term)
            festAndTerm = festAndTerm.join('')

            return festAndTerm == '' ? lunarMD : festAndTerm
        }
    },
    created() {
        
    },
    mounted() {
        this.drawEchart1();
        this.drawEchart2();
        this.drawEchart3();
    },
};
</script>
