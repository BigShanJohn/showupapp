export class Functions {
    formatDate(date: string) {
        let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let d = new Date(date);
        let today = new Date();
        let year = d.getFullYear() == today.getFullYear() ? '' : ' ' + d.getFullYear();
        return month[d.getMonth()] + ' ' + d.getDate() + year; // 30-Dec-2011
    }
}



