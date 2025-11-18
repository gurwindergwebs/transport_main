import { Component, input, output, inject } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexDataLabels, ApexOptions, ApexYAxis, ApexLegend, ApexGrid, ApexFill, ApexPlotOptions } from 'ng-apexcharts';
import { DashboardTileComponent } from './dashboard-tile.component';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../services/sidebar.service';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardTileComponent, ChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
toggleUserDropdown(arg0: number) {
throw new Error('Method not implemented.');
}
  private sidebarService = inject(SidebarService);
showUserDropdown1: any;

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  // Dropdown state for each chart card
  showDropdown1 = false;
  showDropdown2 = false;
  showDropdown3 = false;

  toggleDropdown(card: number) {
    if (card === 1) {
      this.showDropdown1 = !this.showDropdown1;
      this.showDropdown2 = false;
      this.showDropdown3 = false;
    } else if (card === 2) {
      this.showDropdown2 = !this.showDropdown2;
      this.showDropdown1 = false;
      this.showDropdown3 = false;
    } else if (card === 3) {
      this.showDropdown3 = !this.showDropdown3;
      this.showDropdown1 = false;
      this.showDropdown2 = false;
    }
  }

  closeDropdowns() {
    this.showDropdown1 = false;
    this.showDropdown2 = false;
    this.showDropdown3 = false;
  }
  // Daily Sales Chart
  public dailySalesSeries: ApexAxisChartSeries = [
    {
      name: 'Orders',
      data: [100000, 95000, 120000, 110000, 90000, 125000, 80000, 60000, 95000, 105000, 115000, 90000],
      color: '#22c55e', // green-500
    },
    {
      name: 'Delivered',
      data: [25000, 30000, 28000, 26000, 24000, 22000, 20000, 21000, 23000, 25000, 27000, 26000],
      color: '#3b82f6', // blue-500
    },
  ];
  public dailySalesOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 220,
      toolbar: { show: false },
      fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: { style: { colors: '#a3a3a3' } },
    },
    yaxis: {
      labels: { style: { colors: '#a3a3a3' } },
      min: 0,
      max: 125000,
      tickAmount: 5,
    },
    stroke: {
      curve: 'smooth',
      width: [3, 3],
      dashArray: [0, 6],
    },
    dataLabels: { enabled: false },
    colors: ['#22c55e', '#3b82f6'],
    grid: {
      borderColor: '#e5e7eb',
      row: { colors: ['#f9fafb', 'transparent'], opacity: 0.5 },
    },
    legend: { show: false },
  };

  // Statistics Chart
  public statisticsSeries: ApexAxisChartSeries = [
    {
      name: 'Open Compaign',
      data: [90000, 80000, 110000, 100000, 95000, 90000, 85000, 95000, 120000, 110000, 105000, 60000],
      color: '#3b82f6', // blue-500
    },
    {
      name: 'Marketing Cost',
      data: [25000, 20000, 30000, 25000, 22000, 21000, 20000, 23000, 27000, 25000, 24000, 18000],
      color: '#facc15', // yellow-400
    },
  ];
  public statisticsOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 220,
      stacked: false,
      toolbar: { show: false },
      fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        borderRadius: 6,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: { style: { colors: '#a3a3a3' } },
    },
    yaxis: {
      labels: { style: { colors: '#a3a3a3' } },
      min: 0,
      max: 125000,
      tickAmount: 5,
    },
    dataLabels: { enabled: false },
    colors: ['#3b82f6', '#facc15'],
    grid: {
      borderColor: '#e5e7eb',
      row: { colors: ['#f9fafb', 'transparent'], opacity: 0.5 },
    },
    legend: { show: false },
  };

  // Total Revenue Chart
  public revenueSeries: ApexAxisChartSeries = [
    {
      name: 'Total Income',
      data: [60000, 80000, 90000, 100000, 95000, 110000, 90000, 70000, 95000, 105000, 115000, 90000],
      color: '#22d3ee', // teal-400
    },
    {
      name: 'Total Expenses',
      data: [25000, 40000, 50000, 60000, 55000, 70000, 60000, 40000, 65000, 75000, 85000, 60000],
      color: '#3b82f6', // blue-500
    },
  ];
  public revenueOptions: ApexOptions = {
    chart: {
      type: 'area',
      height: 220,
      toolbar: { show: false },
      fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: { style: { colors: '#a3a3a3' } },
    },
    yaxis: {
      labels: { style: { colors: '#a3a3a3' } },
      min: 0,
      max: 125000,
      tickAmount: 5,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 90, 100],
        colorStops: []
      },
    },
    dataLabels: { enabled: false },
    colors: ['#22d3ee', '#3b82f6'],
    grid: {
      borderColor: '#e5e7eb',
      row: { colors: ['#f9fafb', 'transparent'], opacity: 0.5 },
    },
    legend: { show: false },
  };

  // Data Uses Donut Chart
  public dataUsesSeries: number[] = [19.2, 30.8, 23.1, 11.5, 15.4];
  public dataUsesOptions: ApexOptions = {
    chart: {
      type: 'donut',
      height: 280,
      fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
    },
    labels: ['10-18 (Child)', '18-26 (Young)', '27-35 (Adult)', '36-50 (Middle Age)', '51+ (Senior)'],
    colors: ['#60a5fa', '#4f46e5', '#22c55e', '#ef4444', '#facc15'],
    legend: { show: false },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: false,
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(1) + '%';
      },
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        colors: ['#fff'],
      },
      dropShadow: {
        enabled: false,
      },
    },
    stroke: {
      width: 2,
      colors: ['#fff'],
    },
  };
}
