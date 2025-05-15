export interface TimesheetEntry {
    date: string;         // ISO string or 'YYYY-MM-DD'
    timeIn: string;       // 'HH:mm' format
    timeOut: string;      // 'HH:mm' format
    breakHours: number;   // Whole hours for break
    breakMinutes: number; // Minutes for break
    totalHours: number;   // Calculated total hours
  }
  
  export interface Timesheet {
    id: number;                 // Unique ID of this timesheet record
    employeeId: number;         // Link to the employee
    startDate: string;          // Timesheet period start
    endDate: string;            // Timesheet period end
    hourlyRate: number;         // For pay calculation
    entries: TimesheetEntry[];  // List of daily records
  }
  