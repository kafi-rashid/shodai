import React from 'react';
import { Purchases } from '../../fakedb/Purchases';
import { Form, Dropdown } from 'semantic-ui-react';
import moment from 'moment';

export default class Monthly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      months: [],
      month: moment().subtract(1, 'month').format('MMMM'),
      year: moment().format('YYYY')
    };
  }

  componentDidMount = () => {
    const current = moment().format('MM');
    const months = [];
    for(let i = 1; i < current; i++) {
      months.push({
        key: moment(i, 'MM').format('MMMM'), value: moment(i, 'MM').format('MMMM'), text: moment(i, 'MM').format('MMMM')
      })
    }
    this.setState({ months })
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  onChange = (event, result) => {
    const { name, value } = result || event.target;
    this.setState({ [name]: value });
  };

  pdf = () => {
    var content = document.getElementById("report-wrapper");
    var pri = document.getElementById("report-frame").contentWindow;
    pri.document.open();
    pri.document.write(`<style>*{font-family:sans-serif;font-size:13px}.font-xxl{font-size:18px!important}p{padding:0;margin:0}.text-center{text-align:center}.table{width:100%}.table-sticky *{font-size:13px}.table-sticky{padding:0;position:relative;overflow-y:auto;max-height:calc(100vh - 325px);min-height:300px;border:thin solid #a4f2c6;border-radius:0px}.table-sticky table{border-collapse:separate;border-spacing:0;margin-bottom:0!important;margin-top:0!important}.table-sticky thead th{position:sticky;top:0;background-color:#dafae8;height:30px!important;border:none!important;padding:8px 15px!important;border-bottom:2px solid #a4f2c6!important;text-transform:uppercase;font-size:12px;font-weight:700}.table-sticky thead th:first-of-type{border-top-left-radius:0px}.table-sticky thead th:last-of-type{border-top-right-radius:0px}.table-sticky td{cursor:pointer;border:none!important;background-color:#fff;padding:8px 15px!important}.table-sticky td,.table-sticky th{border-bottom:thin solid #a4f2c6!important}.table-sticky tbody tr:last-of-type td{border-bottom:none!important}.table-sticky tbody tr:last-child td:first-of-type{border-bottom:none!important}.table-sticky tr:hover td{background-color:#f0f0f0}.table-sticky{margin-bottom:0!important}.table-sticky table{margin-bottom:0!important}.table-sticky tr:hover{box-shadow:none}.table-sticky table{border-collapse:separate;border-spacing:0}.reset-height{min-height:unset}.reset-min-height{min-height:unset}.reset-max-height{max-height:unset}.max-height-100px{max-height:100px}.max-height-200px{max-height:200px}.max-height-300px{max-height:300px}.table-dense td{padding-top:5px!important;padding-bottom:5px!important}.table-v-center td,.table-v-center th{vertical-align:middle!important}.footer-row td{padding:8px 15px!important;background-color:#eef1fd;font-weight:600}.title{text-transform:uppercase;font-size:var(--font-medium);font-weight:700!important;}.text-right{text-align:right}</style>`);
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  }

  render() {
    return (
      <div className='col-md-12'>
        <div className='content-body content-body-w-nav'>
          <div className='row'>

            <div className='col-md-9'>
              <div className='row'>
                <div className='form-group col-md-3'>
                  <label>Month</label>
                  <Dropdown
                    name="month"
                    onChange={ this.onChange }
                    placeholder='Select'
                    fluid
                    selection
                    options={ this.state.months }
                    value={ this.state.month }
                  />
                </div>

                <div className='form-group col-md-2'>
                  <label>Year</label>
                  <Dropdown
                    name="year"
                    onChange={ this.onChange }
                    placeholder='Select'
                    fluid
                    selection
                    options={[ { key: '2022', value: '2022', text: '2022' } ]}
                    value={ this.state.year }
                  />
                </div>

                <div className='form-group col-md-2'>
                  <label>&nbsp;</label>
                  <button className='button button-blue h-40px'>
                    Refine Report
                  </button>
                </div>
              </div>
            </div>

            <div className='col-md-3'>
              <div className='form-group text-right'>
                <label>Export as</label>
                <button className='button button-red h-40px float-right' onClick={ () => { this.pdf() } }>
                  <i className='material-icons'>file_download</i>&nbsp;PDF
                </button>
                <button className='button button-green h-40px float-right mr-3'>
                  <i className='material-icons'>file_download</i>&nbsp;Excel
                </button>
              </div>
            </div>

            <iframe id="report-frame" style={{ height: 0, width: 0, position: 'absolute', display: 'none' }}></iframe>
            <div className='col-md-12 mt-4'>
              <div id='report-wrapper' className='print-area'>
                <p className='title text-center font-xxl'>Monthly Report: { this.state.month } 2022</p>
                <p className='title text-center' style={{ marginBottom: '15px' }}>12 Lancer Canteen</p>
                <p className='title text-center'>Generated at { moment().format('HH:mm on DD MMMM YYYY') }</p>

                <div className='table-responsive table-sticky reset-height reset-max-height reset-min-height' style={{ marginTop: '30px' }}>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th width="50">SN.</th>
                        <th>Description</th>
                        <th width="100" className='text-right'>Amount</th>
                        <th>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Principal Capital</td>
                        <td className='text-right'>608,994.08</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Total Profit</td>
                        <td className='text-right'>79,093.98</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Due Payments</td>
                        <td className='text-right'>164,105.00</td>
                        <td></td>
                      </tr>
                      <tr className='footer-row'>
                        <td className='text-right font-weight-bold' colSpan='2'>Total</td>
                        <td className='text-right font-weight-bold'>852,193.00</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className='title text-center' style={{ marginTop: '35px', marginBottom: '15px' }}>Principal Capital Breakdown</p>
                <div className='table-responsive table-sticky reset-height reset-max-height reset-min-height'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th width="50">SN.</th>
                        <th>Description</th>
                        <th width="100" className='text-right'>Amount</th>
                        <th>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Bank Deposit</td>
                        <td className='text-right'>7,313.00</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Due Payments</td>
                        <td className='text-right'>654,573.40</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Cash</td>
                        <td className='text-right'>8,714.20</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Dry Canteen Assets</td>
                        <td className='text-right'>111,988.08</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Wet Canteen Assets</td>
                        <td className='text-right'>64,885.10</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>Administrative Expenses</td>
                        <td className='text-right'>2,706.00</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>Others</td>
                        <td className='text-right'>2,013.28</td>
                        <td></td>
                      </tr>
                      <tr className='footer-row'>
                        <td className='text-right font-weight-bold' colSpan='2'>Total</td>
                        <td className='text-right font-weight-bold'>852,193.06</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className='title text-center' style={{ marginTop: '35px', marginBottom: '15px' }}>Profit Calculation</p>
                <div className='table-responsive table-sticky reset-height reset-max-height reset-min-height'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th width="50">SN.</th>
                        <th className='text-right'>Gross Profit</th>
                        <th className='text-right'>Administrative Expenses</th>
                        <th className='text-right'>Net Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='footer-row'>
                        <td>1</td>
                        <td className='text-right font-weight-bold'>79,093.98</td>
                        <td className='text-right font-weight-bold'>2,706.00</td>
                        <td className='text-right font-weight-bold'>76,387.98</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className='font-weight-bold' style={{ marginTop: '35px' }}>
                  <hr style={{ width: '200px', margin: 0, marginTop: '80px', marginBottom: '10px' }}/>
                  Authorized Signature
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}