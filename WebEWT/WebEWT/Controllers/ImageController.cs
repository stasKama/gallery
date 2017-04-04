using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Xml;
using WebEWT.Models;

namespace WebEWT.Controllers
{
    public class ImageController : Controller
    {
        public ActionResult UploadImage()
        {
            return View();
        }

        public ActionResult Gallery()
        {
            ViewBag.ImagesJSON = GetImages();
            return View();
        }

        public ActionResult AddImage(HttpPostedFileBase file)
        {
            var fileName = Request.Form["file-name"].Length == 0 ? file.FileName : Request.Form["file-name"] + file.FileName.Substring(file.FileName.LastIndexOf("."));
            var path = getPathToImg(fileName);
            file.SaveAs(path);
            return RedirectToAction("Index", "Home");
        }

    /*    public JsonResult AddImageAjax(string fileName, string fileData)
        {
            var dataIndex = fileData.IndexOf("base64", StringComparison.Ordinal) + 7;
            var cleareData = fileData.Substring(dataIndex);
            var fileInformation = Convert.FromBase64String(cleareData);
            var bytes = fileInformation.ToArray();

            var path = getPathToImg(fileName);
            var fileStream = System.IO.File.Create(path);

            fileStream.Write(bytes, 0, bytes.Length);
            fileStream.Close();
            return Json(true, JsonRequestBehavior.AllowGet);
        }*/

        private string getPathToImg(string fileName)
        {
            var serverPath = Server.MapPath("~");
            return Path.Combine(serverPath, "Content", "img", fileName);
        }

        [HttpPost]
        public JsonResult GetImages()
        {
            var serverPath = Server.MapPath("~");
            var pathToImageFolder = Path.Combine(serverPath, "Content", "img");
            var imageFiles = Directory.GetFiles(pathToImageFolder);
            var imgesUrl = imageFiles.Select(buildImage);
            //  JavaScriptSerializer serializer = new JavaScriptSerializer();
            // return serializer.Serialize(imges);
            return Json(imgesUrl, JsonRequestBehavior.AllowGet);
        }

        private string buildImage(string path)
        {
            var fileName = Path.GetFileName(path);
            var url = Url.Content("~/Content/img/" + fileName);
            return url;
        }
    }
}