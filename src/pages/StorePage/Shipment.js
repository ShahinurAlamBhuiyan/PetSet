import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';
import ProcessPayment from '../../components/Payment/ProcessPayment';
import { AuthContext } from '../../Providers/AuthProvider';


const Shipment = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loggedInUser } = useContext(AuthContext);
    const { product_id } = useParams();

    const [shippingData, setShippingData] = useState(null);
    const [status] = useState('pending');

    const onSubmit = data => {
        setShippingData(data);
    }

    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = currentDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    const handlePaymentSuccess = (paymentId) => {
        const orderDetails = {
            orderer_name: shippingData.consumerName,
            orderer_id: loggedInUser.u_id,
            orderer_email: shippingData.consumerEmail,
            orderer_contact: shippingData.phone,
            product_id,
            payment_Id: paymentId,
            shipping_address: shippingData.address + " " + shippingData.district + " " + shippingData.zip + " " + shippingData.division,
            status,
            order_date: formattedDate
        };
        console.log({ orderDetails })


    }




    return (
        <div className="container col-md-7 col-lg-8 py-5">
            <div className="row">
                {/* BILLING ADDRESS */}
                <div style={{ display: shippingData ? 'none' : 'block' }}>
                    <h4 className="mb-3">Billing address</h4>
                    <form className='container' onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-3">
                            <div className="col-12 pt-2">
                                <label for="Name" className="form-label">Name</label>
                                < input name="consumerName" defaultValue={loggedInUser.full_name} {...register('consumerName', { required: true })} className="form-control" />
                                {errors.name && <span className="error">Name is required</span>}
                            </div>

                            <div className="col-12 pt-2">
                                <label for="email" className="form-label">Email <span className="text-muted">(Optional)</span></label>
                                <input type="email" name="consumerEmail" defaultValue={loggedInUser.email} {...register('consumerEmail', { required: true })} className="form-control" id="consumerEmail" />
                                <div className="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>

                            <div className="col-12 pt-2">
                                <label for="Name" className="form-label">Phone Number</label>
                                < input placeholder='01*********' name="phone" type="tel" pattern="[0-9]{11}" {...register('phone', { required: true })} className="form-control" />
                                {errors.phone && <span className="error">Phone is required</span>}
                            </div>

                            <div className="col-12 pt-2">
                                <label for="address" className="form-label">Address</label>
                                <input type="text" name="address" {...register('address', { required: true })} className="form-control" id="address" required />
                                <div className="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>

                            <div className="centering_items_flex">
                                <div>
                                    <label for="division" className="form-label">Division</label>
                                    <select name="division" className="form-select" {...register('division', { required: true })} id="division" required>
                                        <option disabled value="">Select Division</option>
                                        <option>Barishal</option>
                                        <option>Chittagong</option>
                                        <option>Dhaka</option>
                                        <option>Khulna</option>
                                        <option>Mymensingh</option>
                                        <option>Rajshahi</option>
                                        <option>Rangpur</option>
                                        <option>Sylhet</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid division.
                                    </div>
                                </div>

                                <div>
                                    <label for="district" className="form-label">District</label>
                                    <input name="district" {...register('district', { required: true })} className="form-control" id="district" required />
                                    <div className="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>

                                <div>
                                    <label for="zip" className="form-label">Zip</label>
                                    <input type="text" name="zip" {...register('zip', { required: true })} className="form-control" id="zip" placeholder="" required />
                                    <div className="invalid-feedback">
                                        Zip code required.
                                    </div>

                                </div>
                            </div>

                            <hr className="my-4" />
                        </ div>
                        <hr className="my-4" />
                        <input className="w-100 btn btn-primary btn-lg" type="submit" />
                    </form>
                </div>

                {/* PAYMENT */}
                <div style={{ display: shippingData ? 'block' : 'none' }}>
                    <h4 className="mb-3">Payment</h4>

                    <div className="my-3">
                        <div className="form-check">
                            <input id="credit" name="paymentMethod" type="radio" className="form-check-input" checked required />
                            <label className="form-check-label" for="credit">Credit card</label>
                        </div>
                        <div className="form-check">
                            <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required />
                            <label className="form-check-label" for="debit">Debit card</label>
                        </div>
                        <div className="form-check">
                            <input id="bKash" name="paymentMethod" type="radio" className="form-check-input" required />
                            <label className="form-check-label" for="bKash">bKash</label>
                        </div>
                    </div>
                    <label for="cc-name" className="form-label">Name on card</label>
                    <input type="text" className="form-control" id="cc-name" placeholder="" required />
                    <small className="text-muted">Full name as displayed on card</small>
                    <div className="invalid-feedback">
                        Name on card is required
                    </div>
                    <br />
                    <br />
                    <label for="creditCard">Credit Card</label>
                    <div className="mt-3">
                        <ProcessPayment shippingData={shippingData} handlePayment={handlePaymentSuccess}></ProcessPayment>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipment;