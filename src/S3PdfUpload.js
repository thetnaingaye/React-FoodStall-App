import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import ReactLoading from 'react-loading';


class S3PdfUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadFile: null,
            pdfUrl: "",
            submitting: false,
        }
    }

    onChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        this.setState({
            uploadFile: file
        })

    }

    uploadToS3 = (e) => {
        e.preventDefault();
        if (this.state.uploadFile) {
            const file = this.state.uploadFile;
            this.setState({
                submitting: true
            })
            console.log("uploading to s3..." + this.state.uploadFile.name)
            Storage.put(`${this.props.orderid}.pdf`, file, {
                contentType: 'application/pdf'
            })
                .then(result => {
                    console.log("file uploaded: " + JSON.stringify(result));
                    this.fileInput.value = "";
                    this.setState({
                        uploadFile: null,
                        submitting: false
                    })

                    Storage.get(result.key)
                        .then(result => {
                            console.log("get pdf:" + result)
                            this.setState({
                                pdfUrl: result
                            })
                        })
                        .catch(err => console.log(err));

                })
                .catch(err => console.log(err));
        }
    }

    render() {
        const pdfLink = (
            <div style={{ fontSize: "10px" }}>
                <p>File has successfully uploaded to aws S3 and download <a href={this.state.pdfUrl} target="_blank">here</a></p>
            </div>
        )
        const id = this.props.orderid !== " "? this.props.orderid : "none";

        return (
            <div>
                {this.state.submitting && <div><p>Uploading to AWS S3...</p>
                    <ReactLoading type="bubbles" color="peru" height={100} width={100} />
                </div>}

                <div style={!this.state.submitting ? {} : { display: 'none' }}>
                    <form onSubmit={this.uploadToS3}>
                        <div className="form-group">
                            Upload Invoice for order id :
                            <label style={{color:"peru"}}htmlFor="pdfinput">{id}</label>
                            <input type="file" className="form-control" id="pdfinput" onChange={this.onChange} ref={ref => this.fileInput = ref} />
                            <br />
                            <input className="btn btn-success" type="submit" value="upload" />
                        </div>
                    </form>
                    {this.state.pdfUrl && pdfLink}
                </div>
            </div>
        )
    }
}

export default S3PdfUpload;